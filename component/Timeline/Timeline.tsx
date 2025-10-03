'use client'
import { Timeline as MUITimeline, timelineItemClasses } from '@mui/lab'
import { TimelineItem, TimelineItemProps } from './TimelineItem'
import { FC } from 'react'
import Box from '@mui/material/Box'
import { Text } from '@/component/Text'

export type TimeLineProps = {
  title: string
  items: Array<Omit<TimelineItemProps, 'onClick'>>
  onClick?: TimelineItemProps['onClick']
  className?: string
  readOnly?: boolean
}
export const Timeline: FC<TimeLineProps> = (props) => {
  const { title, items, className, onClick, readOnly } = props
  return (
    <Box className={className}>
      <Text variant="h6" color="grey.700">
        {title}
      </Text>
      <MUITimeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          marginTop: 0,
          '&.MuiTimeline-root': {
            paddingRight: 0,
          },
        }}
      >
        {items.map((props, i) => {
          return <TimelineItem {...props} onClick={onClick} readOnly={readOnly} key={i} />
        })}
      </MUITimeline>
    </Box>
  )
}
