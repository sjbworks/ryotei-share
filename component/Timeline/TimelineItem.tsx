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

export type Plan = { datetime: string; description: string }
export type TimelineItemProps = Plan & {
  color?: TimelineDotProps['color']
  onClick?: (action: Action, value: Plan) => void
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { datetime, description, color, onClick } = props
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
            {datetime}
          </Typography>
          <MenuControl onClick={onClick} datetime={datetime} description={description} />
        </div>
        <Typography variant="body1" color="grey.800">
          {description}
        </Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
