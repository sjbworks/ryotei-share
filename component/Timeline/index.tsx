import { Timeline as MUITimeline } from '@mui/lab'
import { TimelineItem, TimelineItemProps } from './TimelineItem'
import { FC } from 'react'

export type TimeLineProps = {
  items: Array<TimelineItemProps>
  className?: string
}
export const Timeline: FC<TimeLineProps> = (props) => {
  const { items } = props
  return (
    <MUITimeline>
      {items.map((props, i) => (
        <TimelineItem {...props} key={i} />
      ))}
    </MUITimeline>
  )
}
