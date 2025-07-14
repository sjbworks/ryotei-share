import { Timeline as TimelineComponent } from '../index'
import type { Meta, StoryObj } from '@storybook/nextjs'
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
    plan: {
      time: '9:00',
      label: '大宮駅 豆の木',
    },
  },
  {
    plan: {
      time: '10:00',
      label: '新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟',
    },
  },
  {
    plan: {
      time: '12:00',
      label: 'スキー場',
    },
  },
  {
    plan: {
      time: '13:00',
      label: 'スキー場',
    },
  },
  {
    plan: {
      time: '13:00',
      label: 'スキー場',
    },
  },
  {
    plan: {
      time: '13:00',
      label: 'スキー場',
    },
  },
]

export const Timeline: Story = {
  render: () => <TimelineComponent items={items} title="aaaa" />,
}
