import { Timeline as MUITimeline, timelineItemClasses } from '@mui/lab'
import { TimelineItem, TimelineItemProps } from './TimelineItem'
import { FC } from 'react'

export type TimeLineProps = {
  items: Array<TimelineItemProps>
  className?: string
}
export const Timeline: FC<TimeLineProps> = (props) => {
  const { items } = props
  return (
    <MUITimeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {items.map((props, i) => {
        return <TimelineItem {...props} key={i} />
      })}
    </MUITimeline>
  )
}
