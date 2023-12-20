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
import { MenuControl } from './MenuControl'

export type TimelineItemProps = {
  time: string
  label: string
  color?: TimelineDotProps['color']
  isLast?: boolean
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color } = props
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
      <TimelineContent sx={{ paddingRight: 0 }}>
        <div className="flex justify-between">
          <Typography variant="subtitle2" component="span" color="grey.500" sx={timeSx}>
            <AccessTimeIcon fontSize="small" sx={{ marginRight: '2px' }} />
            {time}
          </Typography>
          <MenuControl />
        </div>
        <Typography variant="body1" color="grey.800">
          {label}
        </Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
