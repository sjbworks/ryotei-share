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
import { AccessTimeIcon, MoreHorizIcon } from '../Icon'
import IconButton from '@mui/material/IconButton'

export type TimelineItemProps = {
  time: string
  label: string
  color?: TimelineDotProps['color']
  isLast?: boolean
  onClick?: () => void
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color, onClick } = props
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
          <div>
            <IconButton size="small" onClick={onClick}>
              <MoreHorizIcon />
            </IconButton>
          </div>
        </div>
        <Typography variant="body1" color="grey.800">
          {label}
        </Typography>
      </TimelineContent>
    </MUITimelineItem>
  )
}
