'use client'
import { BottomDrawer } from '@/component/Drawer/BottomDrawer'
import { Menu } from '@/component/Menu/Menu'
import { EditIcon, DeleteIcon } from '@/component'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FlightIcon from '@mui/icons-material/Flight'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import type { FormState } from '@/feature/ryotei/hooks/useFormState'

type Trip = {
  id: string
  name?: string | null
}

type Props = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  trips: Trip[]
  onChangeTripId: (id: string) => void
  selectedTripId?: string
  onClickAddTrip: () => void
  refetchTrip?: () => void
  formState: FormState
  onModalClose?: () => void
  onOpenBottomDrawer?: () => void
}

export const TripListDrawer = ({
  open,
  onClose,
  onOpen,
  trips,
  onChangeTripId,
  selectedTripId,
  onClickAddTrip,
  formState,
  onOpenBottomDrawer,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const menuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, trip: Trip) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedTrip(trip)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedTrip(null)
  }

  const handleEdit = () => {
    if (selectedTrip) {
      formState.setEditTripMode(selectedTrip)
    }
    handleMenuClose()
    onClose()
    onOpenBottomDrawer?.()
  }

  const handleDelete = () => {
    if (selectedTrip && formState.setDeleteTripMode) {
      formState.setDeleteTripMode(selectedTrip)
    }
    handleMenuClose()
    onClose()
    onOpenBottomDrawer?.()
  }

  const menuItems = [
    { label: '編集', action: handleEdit, icon: <EditIcon /> },
    { label: '削除', action: handleDelete, icon: <DeleteIcon /> },
  ]

  return (
    <BottomDrawer open={open} onClose={onClose} onOpen={onOpen}>
      <div data-testid="trip-list-drawer" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <button
          onClick={() => {
            onClickAddTrip()
            onClose()
          }}
          style={{
            margin: '0 14px 6px',
            width: 'calc(100% - 28px)',
            height: 48,
            borderRadius: 14,
            background: 'var(--sun)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
            color: '#fff',
          }}
        >
          <AddIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.85)' }} />
          旅程を作成
        </button>

        {trips.map((trip) => {
          const isActive = trip.id === selectedTripId
          return (
            <div
              key={trip.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderTop: '0.5px solid var(--border)',
                paddingRight: 8,
              }}
            >
              {/* 旅程選択ボタン（行の大部分） */}
              <button
                onClick={() => {
                  onChangeTripId(trip.id)
                  onClose()
                }}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 11,
                    background: isActive ? 'var(--sun-light)' : 'var(--sky-light)',
                    border: `0.5px solid ${isActive ? 'var(--sun-mid)' : 'var(--sky-mid)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FlightIcon
                    sx={{ fontSize: 17, color: isActive ? 'var(--sun-dark)' : 'var(--sky-dark)' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--ink)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {trip.name || '無題'}
                  </div>
                </div>

                {isActive && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--sun)',
                      flexShrink: 0,
                    }}
                  />
                )}
              </button>

              {/* メニューボタン（兄弟要素として分離） */}
              <IconButton
                size="small"
                onClick={(e) => handleMenuOpen(e, trip)}
                sx={{ color: 'var(--ink-3)', flexShrink: 0 }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
          )
        })}

        <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleMenuClose} items={menuItems} />
      </div>
    </BottomDrawer>
  )
}
