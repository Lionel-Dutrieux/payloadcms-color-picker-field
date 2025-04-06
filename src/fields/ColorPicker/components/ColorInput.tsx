import React from 'react'

import type { FieldConfig } from '../types.js'

/**
 * Props for the ColorInput component
 * @interface ColorInputProps
 * @property {string} value - The current color value
 * @property {string} inputValue - The current input value
 * @property {boolean} isValid - Whether the color is valid
 * @property {FieldConfig} field - The field configuration
 * @property {string} path - The field path
 * @property {(value: string) => void} onChange - Callback when the input value changes
 */
interface ColorInputProps {
  field: FieldConfig
  inputValue: string
  isValid: boolean
  onChange: (value: string) => void
  path: string
  value: string
}

/**
 * A reusable color input component that handles text input for color values
 * @component
 * @param {ColorInputProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const ColorInput: React.FC<ColorInputProps> = ({
  field,
  inputValue,
  isValid,
  onChange,
  path,
  value,
}) => {
  return (
    <input
      className={`color-selector__text-field ${!isValid && value ? 'color-selector__text-field--error' : ''}`}
      id={path}
      name={path}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder || '#000000'}
      required={field.required}
      type="text"
      value={inputValue || value}
    />
  )
}
