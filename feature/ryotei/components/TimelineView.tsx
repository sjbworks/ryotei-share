'use client'

import { Timeline, BottomSheet, Layout, Form, Button, AddIcon, Plan, NoData } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useMemo } from 'react'

type Props = { data?: Record<string, Plan[]> }

export const TimelineView = ({ data }: Props) => {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const { handleClick, bottomSheet, setNewData, onMenuClick } = useTimeline()
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])

  return (
    <>
      {isExist ? (
        Object.entries(data || {}).map(([key, data]) => (
          <Timeline key={key} title={key} items={data} onClick={onMenuClick} className="mb-3" />
        ))
      ) : (
        <NoData />
      )}
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
        <AddIcon />
        旅程を登録
      </Button>
      <BottomSheet {...bottomSheet}>
        <Form className={containerStyle} setData={setNewData} />
      </BottomSheet>
    </>
  )
}
