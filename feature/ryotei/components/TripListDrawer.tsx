import { LeftSideDrawer } from '@/component/Drawer/LeftSideDrawer'
import { Button, AddIcon, MoreVertIcon, EditIcon, DeleteIcon } from '@/component'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@/component/Menu/Menu'
import { Modal } from '@/component/Modal'
import { Form } from '@/component/Form/Form'
import { useModal } from '@/feature/ryotei/hooks/useModal'
import { useTripCRUD } from '@/feature/ryotei/hooks/useTripCRUD'
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
  refetchTrip?: () => void
  onModalSubmit?: (data: any) => void
  formState?: any
  onModalClose?: () => void
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
  onModalClose,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const menuOpen = Boolean(anchorEl)

  const editModal = useModal()
  const deleteModal = useModal()
  const { updateTrip, deleteTrip } = useTripCRUD(refetchTrip, onChangeTripId)

  const formState = externalFormState || {
    setEditTripMode: () => {},
    setDeleteTripMode: () => {},
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
    }
    editModal.open()
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedTrip) {
      if (formState.setDeleteTripMode) {
        formState.setDeleteTripMode(selectedTrip)
      }
    }
    deleteModal.open()
    handleMenuClose()
  }

  const handleEditSubmit = async (data: any) => {
    if (selectedTrip) {
      await updateTrip({ id: selectedTrip.id, name: data.name })
      editModal.close()
    }
  }

  const handleModalSubmitWithClose = async (data: any) => {
    if (onModalSubmit) {
      await onModalSubmit(data)
      editModal.close()
      deleteModal.close()
    }
  }

  const handleDeleteSubmit = async () => {
    if (selectedTrip) {
      await deleteTrip({ id: selectedTrip.id })
      deleteModal.close()
    }
  }

  const handleDeleteModalSubmitWithClose = async (data: any) => {
    if (onModalSubmit) {
      await onModalSubmit(data)
      deleteModal.close()
    }
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

      <Modal isOpen={editModal.isOpen}>
        <Form
          mode="addEditTrip"
          data={formState.trip}
          onSubmit={onModalSubmit ? handleModalSubmitWithClose : handleEditSubmit}
          onClose={editModal.close}
          action={{ label: '更新' }}
        />
      </Modal>

      <Modal isOpen={deleteModal.isOpen}>
        <Form
          mode="delete"
          data={formState.trip || selectedTrip}
          onSubmit={onModalSubmit ? handleDeleteModalSubmitWithClose : handleDeleteSubmit}
          onClose={deleteModal.close}
          action={{ label: '削除' }}
        />
      </Modal>
    </LeftSideDrawer>
  )
}
