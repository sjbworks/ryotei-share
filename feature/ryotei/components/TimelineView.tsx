'use client'

import { Timeline, BottomSheet, Modal, Form, Button, AddIcon, NoData } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useMemo } from 'react'
import { useGetRyotei } from '../hooks/useGetRyotei'

export const TimelineView = () => {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const { data, refetch } = useGetRyotei()
  const { handleClick, bottomSheet, onMenuClick, formProps, mode, bottomFormProps, isOpen } = useTimeline(refetch)
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])
  const modalChildren = mode === 'edit' ? <Form {...formProps} /> : '削除しますか？'

  return (
    <>
      {isExist ? (
        Object.entries(data || {}).map(([key, item]) => (
          <Timeline key={key} title={key} items={item} onClick={onMenuClick} className="mb-3" />
        ))
      ) : (
        <NoData />
      )}
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
        <AddIcon />
        旅程を登録
      </Button>
      <Modal isOpen={isOpen}>{modalChildren}</Modal>
      <BottomSheet {...bottomSheet}>
        <Form className={containerStyle} {...bottomFormProps} />
      </BottomSheet>
    </>
  )
}
