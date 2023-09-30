import {
  TimelineItem as MUITimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineDotProps,
} from '@mui/lab'
import { Typography } from '@mui/material'
import { FC } from 'react'

export type TimelineItemProps = {
  time: string
  label: string
  color?: TimelineDotProps['color']
  title?: string
  isLast?: boolean
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color, title, isLast } = props
  return (
    <MUITimelineItem>
      <TimelineSeparator>
        <TimelineDot color={color} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {time && (
          <Typography variant="subtitle2" component="span">
            {time}
          </Typography>
        )}
        <Typography variant="body1">{label}</Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
