'use client'

import { FieldLabel, useField } from '@payloadcms/ui'
import chroma from 'chroma-js'
import React, { useCallback, useMemo, useState } from 'react'

import type { ColorFormats as ColorFormatsType, ColorSelectorProps, ColorValue } from './types.js'

import { ColorFormats } from './components/ColorFormats.js'
import { ColorInput } from './components/ColorInput.js'
import { ColorPicker } from './components/ColorPicker.js'
import './styles.scss'

/**
 * Main Color Picker component for Payload CMS
 * @component
 * @param {ColorSelectorProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export default function ColorPickerComponent({ field, format = 'hex', path }: ColorSelectorProps) {
  const { setValue, value } = useField<string>({ path })
  const [showFormats, setShowFormats] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedColor, setSelectedColor] = useState('#000000')

  /**
   * Checks if a color string is valid
   * @param {string} color - The color to validate
   * @returns {boolean} Whether the color is valid
   */
  const isValidColor = useCallback((color: string): boolean => {
    try {
      chroma(color)
      return true
    } catch {
      return false
    }
  }, [])

  /**
   * Converts a color string to all supported formats
   * @param {string} inputColor - The input color string
   * @returns {ColorFormatsType | null} The converted color formats or null if invalid
   */
  const convertColor = useCallback((inputColor: string): ColorFormatsType | null => {
    try {
      const color = chroma(inputColor)
      return {
        hex: color.hex(),
        hsl: color.css('hsl'),
        oklch: `oklch(${(color.oklch()[0] * 100).toFixed(1)}% ${color.oklch()[1].toFixed(3)} ${color.oklch()[2].toFixed(1)})`,
      }
    } catch {
      return null
    }
  }, [])

  /**
   * Parses the value based on the format
   * @param {string | null} val - The value to parse
   * @returns {ColorValue} The parsed color value
   */
  const parseValue = useCallback(
    (val: null | string): ColorValue => {
      if (!val) {
        return null
      }
      try {
        return format === 'all' ? JSON.parse(val) : val
      } catch {
        return null
      }
    },
    [format],
  )

  const colorValue = useMemo(() => parseValue(value), [value, parseValue])
  const displayColor = useMemo(() => {
    if (format === 'all' && colorValue && typeof colorValue === 'object') {
      return colorValue.hex || ''
    }
    return typeof colorValue === 'string' ? colorValue : ''
  }, [colorValue, format])

  const validDisplayColor = useMemo(() => {
    if (format === 'all' && colorValue && typeof colorValue === 'object') {
      return colorValue.hex || 'transparent'
    }
    return isValidColor(displayColor) ? displayColor : 'transparent'
  }, [colorValue, displayColor, format, isValidColor])

  /**
   * Handles color changes from the color picker
   * @param {string} newColor - The new color value
   */
  const handleColorChange = useCallback(
    (newColor: string) => {
      setSelectedColor(newColor)
      setInputValue(newColor)
      const colorFormats = convertColor(newColor)
      if (colorFormats) {
        if (format === 'all') {
          setValue(JSON.stringify(colorFormats))
        } else {
          setValue(colorFormats[format])
        }
      }
    },
    [convertColor, format, setValue],
  )

  /**
   * Handles text input changes
   * @param {string} input - The new input value
   */
  const handleTextChange = useCallback(
    (input: string) => {
      setInputValue(input)
      if (!input) {
        setValue(null)
        return
      }
      handleColorChange(input)
    },
    [handleColorChange, setValue],
  )

  // Update selected color when value changes
  React.useEffect(() => {
    if (value && isValidColor(value)) {
      setSelectedColor(value)
    }
  }, [value, isValidColor])

  return (
    <div className="color-selector__field">
      <div className="color-selector__header">
        <FieldLabel htmlFor={path} label={field.label || field.name} required={field.required} />
        {format === 'all' && colorValue && (
          <button
            aria-expanded={showFormats}
            className="color-selector__toggle"
            onClick={() => setShowFormats((prev) => !prev)}
            type="button"
          >
            {showFormats ? '−' : '+'}
          </button>
        )}
      </div>
      <div className="color-selector__input-wrapper">
        <ColorInput
          field={field}
          inputValue={inputValue}
          isValid={isValidColor(displayColor)}
          onChange={handleTextChange}
          path={path}
          value={displayColor}
        />
        <ColorPicker
          onChange={handleColorChange}
          value={
            format === 'all' && colorValue && typeof colorValue === 'object'
              ? colorValue.hex
              : selectedColor
          }
        />
      </div>
      {field.description && <div className="color-selector__description">{field.description}</div>}
      {format === 'all' && colorValue && showFormats && typeof colorValue === 'object' && (
        <ColorFormats colorValue={colorValue} />
      )}
    </div>
  )
}
