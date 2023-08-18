import { Timeline as TimelineComponent } from '../index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TimelineComponent> = {
  component: TimelineComponent,
  title: 'Timeline',
}

export default meta
type Story = StoryObj<typeof TimelineComponent>

const items = [
  {
    label: '大宮',
    color: 'primary',
  },
  {
    label: '新潟',
    color: 'primary',
  },
  {
    label: 'スキー場',
    color: 'primary',
    isLast: true,
  },
]

export const Timeline: Story = {
  render: () => <TimelineComponent items={items} />,
}
