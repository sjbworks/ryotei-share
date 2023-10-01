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
import { AccessTimeIcon } from '../Icon'

export type TimelineItemProps = {
  time: string
  label: string
  color?: TimelineDotProps['color']
  title?: string
  isLast?: boolean
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color, title, isLast } = props
  const timeSx = {
    display: 'flex',
    alignItems: 'center',
  }
  return (
    <MUITimelineItem>
      <TimelineSeparator>
        <TimelineDot color={color} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {time && (
          <Typography variant="subtitle2" component="span" color="grey.500" sx={timeSx}>
            <AccessTimeIcon fontSize="small" sx={{ marginRight: '4px' }} />
            {time}
          </Typography>
        )}
        <Typography variant="body1" color="grey.800">
          {label}
        </Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
