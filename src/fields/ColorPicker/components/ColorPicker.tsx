import React from 'react'

/**
 * Props for the ColorPicker component
 * @interface ColorPickerProps
 * @property {string} value - The current color value
 * @property {(color: string) => void} onChange - Callback when the color changes
 */
interface ColorPickerProps {
  onChange: (color: string) => void
  value: string
}

/**
 * A reusable color picker component that provides a native color picker interface
 * @component
 * @param {ColorPickerProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, value }) => {
  return (
    <div className="color-selector__color-preview-container">
      <div className="color-selector__color-preview" style={{ backgroundColor: value }} />
      <input
        aria-label="Color picker"
        className="color-selector__color-picker"
        onChange={(e) => onChange(e.target.value)}
        type="color"
        value={value}
      />
    </div>
  )
}
