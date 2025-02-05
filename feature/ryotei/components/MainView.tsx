'use client'

import { Timeline, Drawer, Modal, Form, Button, AddIcon, MenuIcon, NoData } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useMemo } from 'react'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { Typography } from '@mui/material'

type MainViewProps = {
  id: string
  title: string
}

const drawerBleeding = 56;

export const MainView = ({ id, title }: MainViewProps) => {
  const containerStyle = 'flex flex-col justify-between p-10'
  const { data, refetch } = useGetRyotei()
  const { handleClick, bottomSheet, onMenuClick, formProps, bottomFormProps, isOpen } = useTimeline(refetch)
  const { handleMenuClick, sideOpen, onSideClose, onSideOpen, trips } = useRyoteiList()
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])


  return (
    <>
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleMenuClick}>
        <MenuIcon />
      </Button>
      {isExist ? (
        <div>
          <Typography>{title}</Typography>
          {
            Object.entries(data || {}).map(([key, item]) => (
              <Timeline key={key} title={key} items={item} onClick={onMenuClick} className="mb-3" />
            ))}
        </div>
      ) : (
        <NoData />
      )}
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
        <AddIcon />
        旅程を登録
      </Button>
      <Modal isOpen={isOpen}>
        <Form {...formProps} />
      </Modal>
      <Drawer anchor='left' open={sideOpen} onClose={onSideClose} onOpen={onSideOpen}>{trips?.map((trip) => (
        <Typography>{trip.name}</Typography>
      ))}</Drawer>
      <Drawer {...bottomSheet} anchor="bottom">
        <Form className={containerStyle} {...bottomFormProps} />
      </Drawer>
    </>
  )
}
