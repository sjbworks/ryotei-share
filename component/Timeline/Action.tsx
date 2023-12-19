import IconButton from '@mui/material/IconButton'
import { MoreHorizIcon, EditIcon, DeleteIcon } from '../Icon'
import { Menu } from '../Menu'
import { MouseEvent, useState } from 'react'

const action = {
  edit: EditIcon,
  delete: DeleteIcon,
} as const

type Action = keyof typeof action

type Props = {
  onClick?: (action: Action) => void
}

export const Action = ({ onClick }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)
  const onClose = () => setAnchorEl(null)
  const onItemClick = (action: Action) => {
    console.log(action)
    onClose()
    onClick?.(action)
  }
  const items = Object.entries(action).map(([key, Icon]) => ({ label: key, action: () => onItemClick(key), Icon }))

  return (
    <div>
      <IconButton size="small" onClick={onOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose} items={items} />
    </div>
  )
}
