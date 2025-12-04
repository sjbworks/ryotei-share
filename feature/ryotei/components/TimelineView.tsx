import { useMemo } from 'react'
import { Timeline, NoData } from '@/component'
import { ActionType } from '@/feature/ryotei/types'
import { Plan } from '@/component/Timeline/TimelineItem'

type Props = {
  data: Record<string, Plan[]> | undefined
  onMenuClick?: (action: ActionType, plan: Plan) => void
}

export const TimelineView = ({ data, onMenuClick }: Props) => {
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
