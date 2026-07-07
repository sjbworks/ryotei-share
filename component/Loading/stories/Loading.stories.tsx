import { Loading as LoadingComponent } from '../Loading'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof LoadingComponent> = {
  component: LoadingComponent,
  title: 'Loading',
}

export default meta
type Story = StoryObj<typeof LoadingComponent>

export const Loading: Story = {
  render: () => <LoadingComponent />,
}
