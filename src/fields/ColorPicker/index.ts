import type { Field } from 'payload'

export type ColorFormat = 'all' | 'hex' | 'hsl' | 'oklch'

export type LocalizedLabel = {
  [key: string]: string
}

export type ColorPickerProps = {
  format?: ColorFormat
  label?: LocalizedLabel | string
  name: string
  placeholder?: string
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
              placeholder: props.placeholder,
            },
            path: 'payloadcms-color-picker-field/ColorPickerComponent#default',
          },
        },
      },
      label: props.label,
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
            placeholder: props.placeholder,
          },
          path: 'payloadcms-color-picker-field/ColorPickerComponent#default',
        },
      },
    },
    label: props.label,
    required: props.required,
  }
}

export default ColorPickerField
