'use client'

import { Drawer, Modal, Form, Button, AddIcon, MenuIcon } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useEffect, useMemo } from 'react'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { Typography } from '@mui/material'
import { TimelineView } from './TimelineView'

const drawerBleeding = 56

export const MainView = () => {
  const containerStyle = 'flex flex-col justify-between p-10'
  const { refetch } = useGetRyotei()
  const { handleClick, bottomSheet, formProps, bottomFormProps, modalOpen } = useTimeline(refetch)
  const { handleMenuClick, sideOpen, onSideClose, onSideOpen, trips, selectedTripId, title } = useRyoteiList()

  useEffect(() => {
    console.log('isOpen', modalOpen)
  }, [modalOpen])
  return (
    <>
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleMenuClick}>
        <MenuIcon />
      </Button>
      <TimelineView title={title} />
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
        <AddIcon />
        旅程を登録
      </Button>
      <Modal isOpen={modalOpen}>
        <Form {...formProps} />
      </Modal>
      <Drawer anchor="left" open={sideOpen} onClose={onSideClose} onOpen={onSideOpen}>
        {trips?.map((trip) => <Typography key={trip.id}>{trip.name}</Typography>)}
      </Drawer>
      <Drawer {...bottomSheet} anchor="bottom">
        <Form className={containerStyle} {...bottomFormProps} />
      </Drawer>
    </>
  )
}
