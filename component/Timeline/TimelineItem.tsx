import {
  TimelineItem as MUITimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import { FC } from 'react'

export type TimelineItemProps = {
  label: string
  color: string
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { label, color } = props
  return (
    <MUITimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{label}</TimelineContent>
    </MUITimelineItem>
  )
}
