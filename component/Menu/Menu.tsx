import MUIMenu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Item = {
  label: string
  action: () => void
  icon?: React.ReactNode
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
      {items?.map(({ label, action, icon }, index) => (
        <MenuItem onClick={action} key={index}>
          {icon}
          {label}
        </MenuItem>
      ))}
    </MUIMenu>
  )
}
