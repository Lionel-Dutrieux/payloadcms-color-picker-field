/**
 * Interface representing color values in different formats
 * @interface ColorFormats
 * @property {string} hex - The color in hexadecimal format
 * @property {string} hsl - The color in HSL format
 * @property {string} oklch - The color in OKLCH format
 */
export interface ColorFormats {
  hex: string
  hsl: string
  oklch: string
}

/**
 * Type representing a color value that can be in different formats or null
 * @type {ColorFormats | string | null}
 */
export type ColorValue = ColorFormats | null | string

/**
 * Interface representing the field configuration
 * @interface FieldConfig
 * @property {string} [description] - Optional field description
 * @property {'all' | 'hex' | 'hsl' | 'oklch'} [format] - Optional color format
 * @property {string} [label] - Optional field label
 * @property {string} name - Field name
 * @property {string} [placeholder] - Optional placeholder text
 * @property {boolean} [required] - Whether the field is required
 */
export interface FieldConfig {
  description?: string
  format?: 'all' | 'hex' | 'hsl' | 'oklch'
  label?: string
  name: string
  placeholder?: string
  required?: boolean
}

/**
 * Interface representing the color selector props
 * @interface ColorSelectorProps
 * @property {FieldConfig} field - The field configuration
 * @property {'all' | 'hex' | 'hsl' | 'oklch'} [format] - Optional color format
 * @property {string} path - The field path
 */
export interface ColorSelectorProps {
  field: FieldConfig
  format?: 'all' | 'hex' | 'hsl' | 'oklch'
  path: string
}
