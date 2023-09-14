import {
  TimelineItem as MUITimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  TimelineDotProps,
} from '@mui/lab'
import { Typography } from '@mui/material'
import { FC } from 'react'
import { ICON_MAP, IconKey } from './constants'

export type TimelineItemProps = {
  time: string
  label: string
  color?: TimelineDotProps['color']
  title?: string
  icon?: IconKey
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color, title, icon } = props
  const timelineContentSx = {
    display: 'flex',
    flexDirection: 'column',
    px: 2,
    justifyContent: 'center',
  }
  const Icon = icon ? ICON_MAP[icon] : ICON_MAP['default']
  return (
    <MUITimelineItem>
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
        <TimelineDot color={color}>
          <Icon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={timelineContentSx}>
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
