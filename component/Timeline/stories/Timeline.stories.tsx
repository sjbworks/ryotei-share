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
    datetime: '2025-07-25T07:54:07.869',
    description: 'あああああ',
    id: '1',
    trip_id: '1',
  },
  {
    datetime: '2025-07-25T08:54:07.869',
    description: '新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟',
    id: '2',
    trip_id: '1',
  },
  {
    datetime: '2025-07-25T09:54:07.869',
    description: 'スキー場',
    id: '3',
    trip_id: '1',
  },
  {
    datetime: '2025-07-25T10:54:07.869',
    description: 'スキー場',
    id: '4',
    trip_id: '1',
  },
  {
    datetime: '2025-07-25T11:54:07.869',
    description: 'スキー場',
    id: '5',
    trip_id: '1',
  },
  {
    datetime: '2025-07-25T12:54:07.869',
    description: 'スキー場',
    id: '6',
    trip_id: '1',
  },
]

export const Timeline: Story = {
  render: () => <TimelineComponent items={items} title="aaaa" />,
}
