'use client'
import { Timeline as MUITimeline, timelineItemClasses } from '@mui/lab'
import { TimelineItem, TimelineItemProps } from './TimelineItem'
import { FC } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

export type TimeLineProps = {
  title: string
  items: Array<Omit<TimelineItemProps, 'onClick'>>
  onClick?: TimelineItemProps['onClick']
  className?: string
}
export const Timeline: FC<TimeLineProps> = (props) => {
  const { title, items, className, onClick } = props
  return (
    <Box className={className}>
      <Typography variant="h5" color="grey.700">
        {title}
      </Typography>
      <MUITimeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {items.map((props, i) => {
          return <TimelineItem {...props} onClick={onClick} key={i} />
        })}
      </MUITimeline>
    </Box>
  )
}
