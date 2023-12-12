import MUIMenu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Item = {
  label: string
  action: () => void
}

type Props = MenuProps & {
  items: Array<Item>
}

export const Menu = ({ open, anchorEl, onClose, items }: Props) => {
  return (
    <MUIMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {items?.map(({ label, action }, index) => (
        <MenuItem onClick={action} key={index}>
          {label}
        </MenuItem>
      ))}
    </MUIMenu>
  )
}
