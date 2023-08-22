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
    time: '9:00',
    label: '大宮',
    title: 'タイトル',
    color: 'primary',
  },
  {
    time: '10:00',
    label: '新潟',
    color: 'primary',
  },
  {
    time: '12:00',
    label: 'スキー場',
    color: 'primary',
    isLast: true,
  },
]

export const Timeline: Story = {
  render: () => <TimelineComponent items={items} />,
}
