import { useGetRyotei } from '../hooks/useGetRyotei'
import { useTimeline } from '../hooks/useTimeline'
import { useMemo } from 'react'
import { Timeline, NoData } from '@/component'
import { Typography } from '@mui/material'

type Props = {
  title: string
}

export const TimelineView = ({ title }: Props) => {
  const { data, refetch } = useGetRyotei()
  const { onMenuClick } = useTimeline(refetch)
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])
  if (!isExist) return <NoData />

  return (
    <>
      <Typography>{title}</Typography>
      {Object.entries(data || {}).map(([key, item]) => (
        <Timeline key={key} title={key} items={item} onClick={onMenuClick} className="mb-3" />
      ))}
    </>
  )
}
