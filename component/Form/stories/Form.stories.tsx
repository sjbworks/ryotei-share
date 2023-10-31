import { Form as FormComponent } from '../Form'
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof FormComponent>

const meta: Meta<typeof FormComponent> = {
  component: FormComponent,
  title: 'Form',
}

export default meta
type Story = StoryObj<typeof FormComponent>

export const Form: Story = {
  render: () => <FormComponent />,
}
