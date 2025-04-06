import type { Field } from 'payload'

export type ColorFormat = 'all' | 'hex' | 'hsl' | 'oklch'

export type ColorPickerProps = {
  format?: ColorFormat
  name: string
  required?: boolean
}

export function ColorPickerField(props: ColorPickerProps): Field {
  if (props.format === 'all') {
    return {
      name: props.name,
      type: 'json',
      admin: {
        components: {
          Field: {
            clientProps: {
              format: 'all',
            },
            path: 'payloadcms-color-picker-field/ColorPickerComponent#default',
          },
        },
      },
      required: props.required,
    }
  }

  return {
    name: props.name,
    type: 'text',
    admin: {
      components: {
        Field: {
          clientProps: {
            format: props.format || 'hex',
          },
          path: 'payloadcms-color-picker-field/ColorPickerComponent#default',
        },
      },
    },
    required: props.required,
  }
}

export default ColorPickerField
