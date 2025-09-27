'use client'

import { BottomDrawer, Modal, Form, AddIcon, ArrowForwardIosIcon, Snackbar, Text, Button } from '@/component'
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
import { useState, useContext } from 'react'
import { TripListDrawer } from './TripListDrawer'
import { useModal } from '../hooks/useModal'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import ShareIcon from '@mui/icons-material/Share'
import { SnackbarContext } from '@/feature/provider/SnackbarContextProvider'

export const MainView = () => {
  const snackbarState = useContext(SnackbarContext)
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
  const { handleClick, bottomSheet, bottomFormProps, onMenuClick, onClickAddTrip, formState, onClickShareTrip } =
    useTimeline(refetch, refetchTrip, selectedTripId, onSideClose, onChangeTripId)

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

  const handleClickAdd = async () => {
    await formState.setAddRyoteiMode()
    handleClick()
  }

  const handleClickShare = async () => {
    await onClickShareTrip({ trip_id: selectedTripId })
  }

  const actions = [
    { icon: <AddIcon onClick={handleClickAdd} />, name: '予定を追加' },
    { icon: <ShareIcon onClick={handleClickShare} />, name: '旅程をシェア' },
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
        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
            <Text variant="h6">旅程を作成しましょう</Text>
            <Text variant="body1">旅行の予定を立てるために、まず旅程を作成してください。</Text>
            <Button
              onClick={() => {
                onSideOpen()
              }}
              sx={{ marginTop: '4px' }}
              variant="contained"
            >
              旅程を作成
            </Button>
          </div>
        ) : (
          <TimelineView selectedTripId={selectedTripId} onMenuClick={onMenuClick} />
        )}
        <TripListDrawer
          open={sideOpen}
          onClose={onSideClose}
          onOpen={onSideOpen}
          trips={trips}
          onChangeTripId={onChangeTripId}
          onClickAddTrip={onClickAddTrip}
          refetchTrip={refetchTrip}
          onModalSubmit={bottomFormProps.onSubmit}
          formState={formState}
          onOpenBottomDrawer={handleClick}
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
      {trips.length > 0 && (
        <SpeedDial
          ariaLabel="SpeedDial: 予定を追加, 旅程をシェア"
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
      )}
      <Snackbar {...snackbarState} />
    </div>
  )
}
