import chroma from 'chroma-js'

import type { ColorFormat } from '../index.js'

export interface ColorState {
  hex: string
  hsl: string
  oklch: string
}

export interface ValidatedColor {
  error?: string
  isValid: boolean
  value: ColorState | null
}

export const ColorUtils = {
  /**
   * Format OKLCH values to prevent NaN and handle edge cases
   */
  formatOKLCH(color: chroma.Color): string {
    const oklch = color.oklch()
    const l = Math.max(0, Math.min(100, oklch[0] * 100)) // Lightness: 0-100%
    const c = Math.max(0, Math.min(0.4, oklch[1])).toFixed(3) // Chroma: typically 0-0.4
    let h = oklch[2]

    // Handle undefined hue (happens with black, white, and grays)
    if (isNaN(h) || oklch[1] < 0.0001) {
      h = 0 // Default to 0 for achromatic colors
    } else {
      // Ensure hue is between 0 and 360
      h = ((h % 360) + 360) % 360
    }

    return `oklch(${l.toFixed(1)}% ${c} ${h.toFixed(1)})`
  },

  /**
   * Validates a color string and returns detailed validation result
   */
  validate(color: string): ValidatedColor {
    if (!color) {
      return { isValid: false, value: null }
    }

    try {
      const chromaColor = chroma(color)
      const value = {
        hex: chromaColor.hex(),
        hsl: chromaColor.css('hsl'),
        oklch: this.formatOKLCH(chromaColor),
      }
      return { isValid: true, value }
    } catch (error) {
      return {
        error: 'Invalid color format',
        isValid: false,
        value: null,
      }
    }
  },

  /**
   * Converts a color to the specified format
   */
  convertToFormat(color: string, format: ColorFormat): null | string {
    const validated = this.validate(color)
    if (!validated.isValid || !validated.value) {
      return null
    }

    switch (format) {
      case 'all':
        return JSON.stringify(validated.value)
      case 'hex':
        return validated.value.hex
      case 'hsl':
        return validated.value.hsl
      case 'oklch':
        return validated.value.oklch
      default:
        return validated.value.hex
    }
  },

  /**
   * Parses a color value based on format
   */
  parseValue(value: null | string, format: ColorFormat): ColorState | null | string {
    if (!value) {
      return null
    }

    if (format === 'all') {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    }

    return value
  },

  /**
   * Gets display color for preview
   */
  getDisplayColor(value: ColorState | null | string, format: ColorFormat): string {
    if (!value) {
      return ''
    }

    if (format === 'all' && typeof value === 'object') {
      return value.hex || ''
    }

    return typeof value === 'string' ? value : ''
  },
}
