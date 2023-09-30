import { Timeline as TimelineComponent } from '../index'
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof TimelineComponent>

const meta: Meta<typeof TimelineComponent> = {
  component: TimelineComponent,
  title: 'Timeline',
}

export default meta
type Story = StoryObj<typeof TimelineComponent>

const items: Props['items'] = [
  {
    time: '9:00',
    label: '大宮駅　豆の木',
    title: 'タイトル',
    color: 'primary',
  },
  {
    time: '10:00',
    label: '新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟',
    color: 'info',
  },
  {
    time: '12:00',
    label: 'スキー場',
    color: 'success',
  },
  {
    time: '13:00',
    label: 'スキー場',
    color: 'secondary',
  },
  {
    time: '13:00',
    label: 'スキー場',
    color: 'error',
  },
  {
    time: '13:00',
    label: 'スキー場',
    color: 'warning',
  },
]

export const Timeline: Story = {
  render: () => <TimelineComponent items={items} />,
}
