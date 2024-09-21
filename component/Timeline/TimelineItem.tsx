'use client'
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
import { MenuControl, Action } from './MenuControl'
import { format, parseISO } from 'date-fns'

export type Plan = { datetime: string; description: string; id: string }
export type TimelineItemProps = Plan & {
  color?: TimelineDotProps['color']
  onClick?: (action: Action, value: Plan) => void
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { id, datetime, description, color, onClick } = props
  const timeSx = {
    display: 'flex',
    alignItems: 'center',
  }
  const time = format(parseISO(datetime), 'HH:mm')
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
          <MenuControl onClick={onClick} id={id} datetime={datetime} description={description} />
        </div>
        <Typography variant="body1" color="grey.800">
          {description}
        </Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
