import { useCallback, useEffect, useState } from 'react'

import type { ColorFormat } from '../index.js'

import { type ColorState, ColorUtils } from '../utils/colorUtils.js'
import { debounce } from '../utils/debounce.js'

interface UseColorStateProps {
  format: ColorFormat
  initialValue: null | string
  onChange: (value: null | string) => void
}

interface ColorStateReturn {
  colorState: ColorState | null
  displayColor: string
  error: string | undefined
  handleColorChange: (newColor: string) => void
  handleInputChange: (input: string) => void
  inputValue: string
  isValid: boolean
}

export const useColorState = ({
  format,
  initialValue,
  onChange,
}: UseColorStateProps): ColorStateReturn => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string>()
  const [colorState, setColorState] = useState<ColorState | null>(null)

  // Créer une version debounced de la fonction de mise à jour
  const debouncedUpdateColorState = useCallback(
    debounce((color: string) => {
      const validated = ColorUtils.validate(color)
      setError(validated.error)

      if (validated.isValid && validated.value) {
        setColorState(validated.value)
        if (format === 'all') {
          setInputValue(validated.value.hex)
          onChange(JSON.stringify(validated.value))
        } else {
          const formattedValue = ColorUtils.convertToFormat(color, format)
          if (formattedValue) {
            setInputValue(formattedValue)
            onChange(formattedValue)
          }
        }
      } else {
        setColorState(null)
        onChange(null)
      }
    }, 150), // 150ms de debounce
    [format, onChange],
  )

  // Nettoyer le debounce lors du démontage du composant
  useEffect(() => {
    return () => {
      debouncedUpdateColorState.cancel()
    }
  }, [debouncedUpdateColorState])

  const handleColorChange = useCallback(
    (newColor: string) => {
      // Mettre à jour immédiatement l'aperçu pour une meilleure UX
      setInputValue(newColor)
      debouncedUpdateColorState(newColor)
    },
    [debouncedUpdateColorState],
  )

  const handleInputChange = useCallback(
    (input: string) => {
      setInputValue(input)
      if (!input) {
        setError(undefined)
        setColorState(null)
        onChange(null)
        return
      }
      debouncedUpdateColorState(input)
    },
    [onChange, debouncedUpdateColorState],
  )

  // Initialize state from props
  useEffect(() => {
    if (initialValue) {
      if (format === 'all') {
        try {
          const parsedValue = JSON.parse(initialValue)
          const validated = ColorUtils.validate(parsedValue.hex)
          if (validated.value) {
            setColorState(validated.value)
            setInputValue(validated.value.hex)
          }
        } catch {
          // If JSON parsing fails, try to validate as a color string
          const validated = ColorUtils.validate(initialValue)
          if (validated.value) {
            setColorState(validated.value)
            setInputValue(validated.value.hex)
          }
        }
      } else {
        const validated = ColorUtils.validate(initialValue)
        if (validated.value) {
          setColorState(validated.value)
          const formattedValue = ColorUtils.convertToFormat(initialValue, format)
          if (formattedValue) {
            setInputValue(formattedValue)
          }
        }
      }
    }
  }, [initialValue, format])

  const displayColor = colorState?.hex || '#000000'

  return {
    colorState,
    displayColor,
    error,
    handleColorChange,
    handleInputChange,
    inputValue,
    isValid: !!colorState,
  }
}
