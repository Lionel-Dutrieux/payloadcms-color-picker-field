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
        oklch: `oklch(${(chromaColor.oklch()[0] * 100).toFixed(1)}% ${chromaColor.oklch()[1].toFixed(3)} ${chromaColor.oklch()[2].toFixed(1)})`,
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
