'use client'

import { Drawer, Modal, Form, Button, AddIcon, MenuIcon, ArrowForwardIosIcon } from '@/component'
import { LeftSideDrawer } from '@/component/Drawer/LeftSideDrawer'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { TimelineView } from './TimelineView'
import { useRouter } from 'next/navigation'
import { logout } from '@/feature/auth/api'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

export const MainView = () => {
  const formStyle = 'flex flex-col justify-between p-10'
  const { handleMenuClick, sideOpen, onSideClose, onSideOpen, trips, selectedTripId, onChangeTripId, title } =
    useRyoteiList()
  const { refetch } = useGetRyotei(selectedTripId)
  const { handleClick, bottomSheet, formProps, bottomFormProps, modalOpen, onMenuClick } = useTimeline(
    refetch,
    selectedTripId
  )
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <IconButton className="p-0" onClick={handleMenuClick} color="primary" sx={{ padding: 0, fontSize: '12px' }}>
          <ArrowForwardIosIcon sx={{ marginRight: '4px' }} />
          旅程を選択
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleLogout()} variant="text" size="small">
            ログアウト
          </Button>
        </Box>
      </header>
      <main>
        <TimelineView title={title} selectedTripId={selectedTripId} onMenuClick={onMenuClick} />
        <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
          <AddIcon />
          旅程を登録
        </Button>
        <Modal isOpen={modalOpen}>
          <Form {...formProps} />
        </Modal>
        <LeftSideDrawer anchor="left" open={sideOpen} onClose={onSideClose} onOpen={onSideOpen}>
          <div className="flex flex-col p-4">
            {trips?.map((trip) => (
              <Button
                key={trip.id}
                variant="text"
                className="justify-start mb-2"
                onClick={() => {
                  onChangeTripId(trip.id)
                  onSideClose()
                }}
              >
                {trip.name}
              </Button>
            ))}
          </div>
        </LeftSideDrawer>
        <Drawer {...bottomSheet} anchor="bottom">
          <Form className={formStyle} {...bottomFormProps} />
        </Drawer>
      </main>
      <footer>
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClick}>共有する</Button>
        </Box> */}
      </footer>
    </div>
  )
}
