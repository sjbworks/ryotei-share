import { TimelineItem, TimelineItemProps } from './TimelineItem'
import { FC } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

export type TimeLineProps = {
  title: string
  items: Array<Omit<TimelineItemProps, 'onClick'>>
  onClick?: TimelineItemProps['onClick']
  className?: string
  readOnly?: boolean
}

export const Timeline: FC<TimeLineProps> = ({ title, items, onClick, readOnly, className }) => {
  return (
    <div className={className} style={{ marginTop: 18 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          background: 'var(--sky-light)',
          border: '0.5px solid var(--sky-mid)',
          borderRadius: 20,
          padding: '4px 13px',
          marginBottom: 10,
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--sky-dark)',
        }}
      >
        <CalendarMonthIcon sx={{ fontSize: 13 }} />
        {title}
      </div>
      {items.map((item, i) => (
        <TimelineItem {...item} onClick={onClick} readOnly={readOnly} key={i} />
      ))}
    </div>
  )
}
