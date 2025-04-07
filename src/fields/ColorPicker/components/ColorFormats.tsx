import React from 'react'

import type { ColorState } from '../utils/colorUtils.js'

/**
 * Props for the ColorFormats component
 * @interface ColorFormatsProps
 * @property {ColorState} colorValue - The color value in different formats
 */
interface ColorFormatsProps {
  colorValue: ColorState
}

/**
 * A reusable component that displays color values in different formats
 * @component
 * @param {ColorFormatsProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const ColorFormats: React.FC<ColorFormatsProps> = ({ colorValue }) => {
  return (
    <div className="color-selector__formats">
      <div className="color-selector__format">
        <div
          className="color-selector__format-preview"
          style={{ backgroundColor: colorValue.hex }}
        />
        <span>{colorValue.hex}</span>
      </div>
      <div className="color-selector__format">
        <div
          className="color-selector__format-preview"
          style={{ backgroundColor: colorValue.hex }}
        />
        <span>{colorValue.hsl}</span>
      </div>
      <div className="color-selector__format">
        <div
          className="color-selector__format-preview"
          style={{ backgroundColor: colorValue.hex }}
        />
        <span>{colorValue.oklch}</span>
      </div>
    </div>
  )
}
