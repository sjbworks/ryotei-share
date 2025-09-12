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
import { AccountCircleIcon } from '@/component/Icon'
import { Menu } from '@/component/Menu/Menu'
import { useState } from 'react'
import { TripListDrawer } from './TripListDrawer'
import { useModal } from '../hooks/useModal'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import ShareIcon from '@mui/icons-material/Share'

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
  const {
    handleClick,
    bottomSheet,
    formProps,
    bottomFormProps,
    modalOpen,
    onMenuClick,
    onClickAddTrip,
    handleModalSubmit,
    formState,
    shareTrip,
    onClickShareTrip,
  } = useTimeline(refetch, refetchTrip, selectedTripId, onSideClose, onChangeTripId)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const withdrawModal = useModal()

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

  const handleWithdrawAccount = async () => {
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/login')
      } else {
        console.error('Failed to delete account')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  const handleWithdraw = () => {
    handleMenuClose()
    withdrawModal.open()
  }

  const menuItems = [
    {
      label: 'ログアウト',
      action: () => {
        handleMenuClose()
        handleLogout()
      },
    },
    {
      label: '退会',
      action: handleWithdraw,
    },
    {
      label: '利用規約・プライバシーポリシー',
      action: () => {
        handleMenuClose()
        router.push('/legal')
      },
    },
  ]

  const handleClickShare = () => onClickShareTrip({ trip_id: selectedTripId })

  const actions = [
    { icon: <ShareIcon onClick={handleClickShare} />, name: '旅程をシェア' },
    { icon: <AddIcon onClick={handleClick} />, name: '予定を追加' },
  ]

  return (
    <div className="flex flex-col gap-4 relative max-w-2xl mx-auto w-full p-4">
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
              fontWeight: 700,
            }}
          >
            {title}
          </span>
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <AccountCircleIcon color="primary" />
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
          onModalSubmit={handleModalSubmit}
          formState={formState}
        />
        <BottomDrawer {...bottomSheet}>
          <Form className={formStyle} {...bottomFormProps} />
        </BottomDrawer>
        <Modal isOpen={withdrawModal.isOpen}>
          <Form
            mode="withdrawAccount"
            onSubmit={handleWithdrawAccount}
            onClose={withdrawModal.close}
            action={{ label: '退会' }}
          />
        </Modal>
      </main>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    </div>
  )
}
