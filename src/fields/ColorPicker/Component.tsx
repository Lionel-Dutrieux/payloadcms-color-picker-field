'use client'

import { FieldLabel, useField } from '@payloadcms/ui'
import { useState } from 'react'

import type { ColorSelectorProps } from './types.js'

import { ColorFormats } from './components/ColorFormats.js'
import { ColorInput } from './components/ColorInput.js'
import { ColorPicker } from './components/ColorPicker.js'
import { useColorState } from './hooks/useColorState.js'
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

  const {
    colorState,
    displayColor,
    error,
    handleColorChange,
    handleInputChange,
    inputValue,
    isValid,
  } = useColorState({
    format,
    initialValue: value,
    onChange: setValue,
  })

  return (
    <div className="color-selector__field">
      <div className="color-selector__header">
        <FieldLabel htmlFor={path} label={field.label || field.name} required={field.required} />
        {format === 'all' && colorState && (
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
          error={error}
          isValid={isValid}
          onChange={handleInputChange}
          path={path}
          placeholder={field.placeholder}
          required={field.required}
          value={inputValue}
        />
        <ColorPicker onChange={handleColorChange} value={displayColor || '#000000'} />
      </div>
      {field.description && <div className="color-selector__description">{field.description}</div>}
      {format === 'all' && colorState && showFormats && <ColorFormats colorValue={colorState} />}
    </div>
  )
}
