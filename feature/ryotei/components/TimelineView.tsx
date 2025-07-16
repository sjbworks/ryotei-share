import { useGetRyotei } from '../hooks/useGetRyotei'
import { useMemo } from 'react'
import { Timeline, NoData } from '@/component'
import { ActionType } from '@/feature/ryotei/types'
import { Plan } from '@/component/Timeline/TimelineItem'

type Props = {
  selectedTripId?: string
  onMenuClick?: (action: ActionType, plan: Plan) => void
}

export const TimelineView = ({ selectedTripId, onMenuClick }: Props) => {
  const { data } = useGetRyotei(selectedTripId)
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])
  if (!isExist) return <NoData />

  return (
    <>
      {Object.entries(data || {}).map(([key, item]) => (
        <Timeline key={key} title={key} items={item} onClick={onMenuClick} className="mb-3" />
      ))}
    </>
  )
}
