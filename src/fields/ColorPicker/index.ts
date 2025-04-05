import type { Field } from 'payload'

export type ColorPickerProps = { name: string; required?: boolean }

export function ColorPickerField(props: ColorPickerProps): Field {
  return {
    name: props.name,
    type: 'text',
    admin: {
      components: {
        Field: 'payloadcms-color-picker-field/ColorPickerComponent#default',
      },
    },
    required: props.required,
  }
}

export default ColorPickerField
