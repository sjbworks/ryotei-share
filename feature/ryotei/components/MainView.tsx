'use client'

import { BottomDrawer, Modal, Form, Button, AddIcon, ArrowForwardIosIcon } from '@/component'
import { LeftSideDrawer } from '@/component/Drawer/LeftSideDrawer'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { TimelineView } from './TimelineView'
import { useRouter } from 'next/navigation'
import { logout } from '@/feature/auth/api'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Fab from '@mui/material/Fab'

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
    <div className="flex flex-col gap-4 relative">
      <header className="flex items-center justify-between">
        <IconButton className="p-0" onClick={handleMenuClick} color="primary" sx={{ padding: 0, fontSize: '12px' }}>
          <ArrowForwardIosIcon sx={{ marginRight: '4px' }} />
          {title}
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleLogout()} variant="text" size="small">
            ログアウト
          </Button>
        </Box>
      </header>
      <main>
        <TimelineView selectedTripId={selectedTripId} onMenuClick={onMenuClick} />
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
        <BottomDrawer {...bottomSheet}>
          <Form className={formStyle} {...bottomFormProps} />
        </BottomDrawer>
      </main>
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}
