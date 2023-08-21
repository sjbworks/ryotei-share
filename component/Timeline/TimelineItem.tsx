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
  label: string
  color: string
  isLast?: boolean
  title?: string
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { label, color, isLast, title } = props
  return (
    <MUITimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
        9:30 am
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          py: 'auto',
          px: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
