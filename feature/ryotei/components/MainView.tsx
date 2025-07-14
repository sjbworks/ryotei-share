'use client'

import { Drawer, Modal, Form, Button, AddIcon, MenuIcon } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useEffect, useMemo } from 'react'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { TimelineView } from './TimelineView'

export const MainView = () => {
  const containerStyle = 'flex flex-col justify-between p-10'
  const { handleMenuClick, sideOpen, onSideClose, onSideOpen, trips, selectedTripId, onChangeTripId, title } = useRyoteiList()
  const { refetch } = useGetRyotei(selectedTripId)
  const { handleClick, bottomSheet, formProps, bottomFormProps, modalOpen, onMenuClick } = useTimeline(refetch, selectedTripId)

  return (
    <>
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleMenuClick}>
        <MenuIcon />
      </Button>
      <TimelineView title={title} selectedTripId={selectedTripId} onMenuClick={onMenuClick}/>
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
        <AddIcon />
        旅程を登録
      </Button>
      <Modal isOpen={modalOpen}>
        <Form {...formProps} />
      </Modal>
      <Drawer anchor="left" open={sideOpen} onClose={onSideClose} onOpen={onSideOpen}>
        <div className="flex flex-col p-4">
          {trips?.map((trip) => (
            <Button 
              key={trip.id} 
              variant="text" 
              className="justify-start mb-2"
              onClick={()=>{
                onChangeTripId(trip.id)
                onSideClose()
              }}
            >
              {trip.name}
            </Button>
          ))}
        </div>
      </Drawer>
      <Drawer {...bottomSheet} anchor="bottom">
        <Form className={containerStyle} {...bottomFormProps} />
      </Drawer>
    </>
  )
}
