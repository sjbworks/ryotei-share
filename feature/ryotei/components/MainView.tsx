'use client'

import { BottomDrawer, Modal, Form, Button, AddIcon, ArrowForwardIosIcon, MoreVertIcon } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useGetRyotei } from '../hooks/useGetRyotei'
import { useRyoteiList } from '../hooks/useRyoteiList'
import { TimelineView } from './TimelineView'
import { useRouter } from 'next/navigation'
import { logout } from '@/feature/auth/api'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Fab from '@mui/material/Fab'
import { AccountCircleIcon } from '@/component/Icon'
import { Menu } from '@/component/Menu/Menu'
import { useState } from 'react'
import { TripListDrawer } from './TripListDrawer'

export const MainView = () => {
  const formStyle = 'flex flex-col justify-between p-10'
  const {
    handleMenuClick,
    sideOpen,
    onSideClose,
    onSideOpen,
    trips,
    selectedTripId,
    onChangeTripId,
    title,
    refetchTrip,
  } = useRyoteiList()
  const { refetch } = useGetRyotei(selectedTripId)
  const { handleClick, bottomSheet, formProps, bottomFormProps, modalOpen, onMenuClick, onClickAddTrip } = useTimeline(
    refetch,
    refetchTrip,
    selectedTripId,
    onSideClose,
    onChangeTripId
  )
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    {
      label: 'ログアウト',
      action: () => {
        handleMenuClose()
        handleLogout()
      },
    },
  ]
  return (
    <div className="flex flex-col gap-4 relative">
      <header className="flex items-center justify-between">
        <IconButton
          className="p-0"
          onClick={handleMenuClick}
          color="primary"
          sx={{
            display: '-webkit-flex',
            padding: 0,
            fontSize: '12px',
            flex: 3,
            lineClamp: 2,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          <ArrowForwardIosIcon sx={{ marginRight: '4px', flex: 1 }} />
          <span
            style={{
              display: '-webkit-box',
              lineClamp: 2,
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              flex: 12,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textAlign: 'left',
            }}
          >
            {title}
          </span>
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <AccountCircleIcon />
          </IconButton>
          <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleMenuClose} items={menuItems} />
        </Box>
      </header>
      <main style={{ marginTop: '16px' }}>
        <TimelineView selectedTripId={selectedTripId} onMenuClick={onMenuClick} />
        <Modal isOpen={modalOpen}>
          <Form {...formProps} />
        </Modal>
        <TripListDrawer
          open={sideOpen}
          onClose={onSideClose}
          onOpen={onSideOpen}
          trips={trips}
          onChangeTripId={onChangeTripId}
          onClickAddTrip={onClickAddTrip}
          refetchTrip={refetchTrip}
        />
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
