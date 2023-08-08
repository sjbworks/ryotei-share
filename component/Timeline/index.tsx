import {
  Timeline as MUITimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'

type TimelineItem = {
  label: string
  color: string
}

type TimeLineProps = {
  items: Array<TimelineItem>
  className?: string
}
export const Timeline = () => {
  return (
    <MUITimeline position="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </MUITimeline>
  )
}
