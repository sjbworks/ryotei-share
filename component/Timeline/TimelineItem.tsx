import {
  TimelineItem as MUITimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab'
import { Typography } from '@mui/material'
import { FC } from 'react'

export type TimelineItemProps = {
  time: string
  label: string
  color: string
  isLast?: boolean
  title?: string
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color, isLast, title } = props
  const timelineContentSx = {
    display: 'flex',
    flexDirection: 'column',
    px: 2,
    justifyContent: 'center',
  }
  return (
    <MUITimelineItem>
      {/*<TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">*/}
      <TimelineOppositeContent sx={timelineContentSx}>
        {title && (
          <Typography variant="subtitle1" component="span">
            {title}
          </Typography>
        )}
        {time}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={timelineContentSx}>
        {/*<TimelineContent>*/}
        {title && (
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        )}
        <Typography>{label}</Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
