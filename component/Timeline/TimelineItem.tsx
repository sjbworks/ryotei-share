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

type Plan = { time: string; label: string }
export type TimelineItemProps = {
  plan: Plan
  color?: TimelineDotProps['color']
  onClick?: (action: Action, value: Plan) => void
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { plan, color, onClick } = props
  const { time, label } = plan
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
          <MenuControl onClick={onClick} plan={plan} />
        </div>
        <Typography variant="body1" color="grey.800">
          {label}
        </Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
