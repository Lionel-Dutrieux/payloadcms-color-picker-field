import React from 'react'

/**
 * Props for the ColorInput component
 * @interface ColorInputProps
 * @property {string} value - The current color value
 * @property {boolean} isValid - Whether the color is valid
 * @property {string} error - The error message for the color input
 * @property {string} path - The field path
 * @property {string} placeholder - The placeholder text for the input
 * @property {boolean} required - Whether the input is required
 * @property {(value: string) => void} onChange - Callback when the input value changes
 */
interface ColorInputProps {
  error?: string
  isValid: boolean
  onChange: (value: string) => void
  path: string
  placeholder?: string
  required?: boolean
  value: string
}

/**
 * A reusable color input component that handles text input for color values
 * @component
 * @param {ColorInputProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const ColorInput: React.FC<ColorInputProps> = ({
  error,
  isValid,
  onChange,
  path,
  placeholder = '#000000',
  required = false,
  value,
}) => {
  return (
    <div className="color-selector__input-container">
      <input
        className={`color-selector__text-field ${!isValid && value ? 'color-selector__text-field--error' : ''}`}
        id={path}
        name={path}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        type="text"
        value={value}
      />
      {error && value && <div className="color-selector__error-message">{error}</div>}
    </div>
  )
}
