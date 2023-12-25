import IconButton from '@mui/material/IconButton'
import { MoreHorizIcon, EditIcon, DeleteIcon } from '../Icon'
import { Menu } from '../Menu'
import { MouseEvent, useState } from 'react'
import { TimelineItemProps } from './TimelineItem'

const action = {
  edit: EditIcon,
  delete: DeleteIcon,
} as const

export type Action = keyof typeof action

type Props = {
  plan: TimelineItemProps['plan']
  onClick?: TimelineItemProps['onClick']
}

export const MenuControl = ({ onClick, plan }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)
  const onClose = () => setAnchorEl(null)
  const onItemClick = (action: Action, value: TimelineItemProps['plan']) => {
    onClose()
    onClick?.(action, value)
  }
  const items = Object.entries(action).map(([key, Icon]) => ({
    label: key as Action,
    action: () => onItemClick(key as Action, plan),
    icon: <Icon />,
  }))

  return (
    <div>
      <IconButton size="small" onClick={onOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose} items={items} />
    </div>
  )
}
