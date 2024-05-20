import { NoData as NoDataComponent } from '../NoData'
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

const meta: Meta<typeof NoDataComponent> = {
  component: NoDataComponent,
  title: 'NoData',
}

export default meta
type Story = StoryObj<typeof NoDataComponent>

export const NoData: Story = {
  render: () => <NoDataComponent />,
}
