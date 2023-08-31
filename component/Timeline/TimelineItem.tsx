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
import { ICON_MAP, IconKey } from './constants'

export type TimelineItemProps = {
  time: string
  label: string
  color: string
  isLast?: boolean
  title?: string
  icon?: IconKey
}

type Props = { icon?: IconKey }
const Icon = ({ icon }: Props) => {
  if (icon) return ICON_MAP[icon]
  return <></>
}

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const { time, label, color, isLast, title, icon } = props
  const timelineContentSx = {
    display: 'flex',
    flexDirection: 'column',
    px: 2,
    justifyContent: 'center',
  }
  const Icon = icon ? ICON_MAP[icon] : ICON_MAP['food']
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
        <TimelineDot>
          <Icon />
        </TimelineDot>
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
