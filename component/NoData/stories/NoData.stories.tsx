import { NoData as NoDataComponent } from '../NoData'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof NoDataComponent> = {
  component: NoDataComponent,
  title: 'NoData',
}

export default meta
type Story = StoryObj<typeof NoDataComponent>

export const NoData: Story = {
  render: () => <NoDataComponent />,
}
