import { Timeline as MUITimeline } from '@mui/lab'
import { TimelineItem, TimelineItemProps } from './TimelineItem'
import { FC } from 'react'

type TimeLineProps = {
  items: Array<TimelineItemProps>
  className?: string
}
export const Timeline: FC<TimeLineProps> = (props) => {
  const { items } = props
  return (
    <MUITimeline position="left">
      {items.map((props, i) => (
        <TimelineItem {...props} key={i} />
      ))}
    </MUITimeline>
  )
}
