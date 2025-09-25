import { LeftSideDrawer } from '@/component/Drawer/LeftSideDrawer'
import { Button, AddIcon, MoreVertIcon, EditIcon, DeleteIcon } from '@/component'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@/component/Menu/Menu'
import { useTripCRUD } from '@/feature/ryotei/hooks/useTripCRUD'
import { useState } from 'react'

import { TripsInsertInput } from '@/feature/api/graphql'

type Trip = {
  id: any
  name?: string | null
}

type Props = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  trips: Trip[]
  onChangeTripId: (id: string) => void
  onClickAddTrip: () => void
  refetchTrip?: () => void
  onModalSubmit?: (data: any) => void
  formState?: any
  onModalClose?: () => void
  onOpenBottomDrawer?: () => void
}

export const TripListDrawer = ({
  open,
  onClose,
  onOpen,
  trips,
  onChangeTripId,
  onClickAddTrip,
  refetchTrip,
  onModalSubmit,
  formState: externalFormState,
  onOpenBottomDrawer,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const menuOpen = Boolean(anchorEl)

  const { updateTrip, deleteTrip } = useTripCRUD(refetchTrip, onChangeTripId)

  const formState = externalFormState || {
    setEditTripMode: () => {
      console.log('Using fallback setEditTripMode')
    },
    setDeleteTripMode: () => {
      console.log('Using fallback setDeleteTripMode')
    },
    trip: null,
    mode: null,
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, trip: Trip) => {
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
      // React state is async, so we can't immediately check formState.trip
    }
    handleMenuClose()
    onClose() // Close the drawer
    onOpenBottomDrawer?.() // Open BottomDrawer for form
  }

  const handleDelete = () => {
    if (selectedTrip) {
      if (formState.setDeleteTripMode) {
        formState.setDeleteTripMode(selectedTrip)
      }
    }
    handleMenuClose()
    onClose() // Close the drawer
    onOpenBottomDrawer?.() // Open BottomDrawer for form
  }

  const menuItems = [
    {
      label: '編集',
      action: handleEdit,
      icon: <EditIcon />,
    },
    {
      label: '削除',
      action: handleDelete,
      icon: <DeleteIcon />,
    },
  ]
  return (
    <LeftSideDrawer anchor="left" open={open} onClose={onClose} onOpen={onOpen}>
      <div className="flex flex-col truncate w-100">
        {trips?.map((trip) => (
          <div key={trip.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="text"
              className="justify-start mb-2"
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '8px 16px',
                minWidth: 0,
              }}
              onClick={() => {
                onChangeTripId(trip.id)
                onClose()
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {trip.name || '無題'}
              </span>
            </Button>
            <IconButton onClick={(e) => handleMenuOpen(e, trip)} size="small">
              <MoreVertIcon />
            </IconButton>
            <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleMenuClose} items={menuItems} />
          </div>
        ))}
        <Button
          key={'new'}
          variant="contained"
          className="justify-start mb-2"
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            padding: '8px 16px',
            minWidth: 0,
          }}
          onClick={onClickAddTrip}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <AddIcon sx={{ marginRight: '2px' }} />
            旅程を追加
          </span>
        </Button>
      </div>
    </LeftSideDrawer>
  )
}
