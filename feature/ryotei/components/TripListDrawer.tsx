import { LeftSideDrawer } from '@/component/Drawer/LeftSideDrawer'
import { Button, AddIcon, MoreVertIcon } from '@/component'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@/component/Menu/Menu'
import { useState } from 'react'

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
}

export const TripListDrawer = ({ open, onClose, onOpen, trips, onChangeTripId, onClickAddTrip }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    {
      label: '削除',
      action: () => {
        // 旅程の削除
      },
    },
  ]
  return (
    <LeftSideDrawer anchor="left" open={open} onClose={onClose} onOpen={onOpen}>
      <div className="flex flex-col p-4 truncate w-100">
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
            <IconButton onClick={() => void 0} size="small">
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
