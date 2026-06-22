import { useMemo } from 'react'
import { Timeline, NoData } from '@/component'
import { ActionType } from '@/feature/ryotei/types'
import { Plan } from '@/component/Timeline/TimelineItem'

type Props = {
  data: Record<string, Plan[]> | undefined
  onMenuClick?: (action: ActionType, plan: Plan) => void
  onAdd?: () => void
}

export const TimelineView = ({ data, onMenuClick, onAdd }: Props) => {
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])
  if (!isExist) return <NoData onAdd={onAdd} />

  return (
    <>
      {Object.entries(data || {}).map(([key, item]) => (
        <Timeline key={key} title={key} items={item} onClick={onMenuClick} className="mb-3" />
      ))}
    </>
  )
}
