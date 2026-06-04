import MUIMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import type { MenuProps } from '@mui/material/Menu'

type Item = {
  label: string
  action: () => void
  icon?: React.ReactNode
  variant?: 'danger'
}

type Props = Pick<MenuProps, 'open' | 'anchorEl' | 'onClose'> & {
  items: Array<Item>
}

export const Menu = ({ open, anchorEl, onClose, items }: Props) => {
  return (
    <MUIMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '14px',
            border: '0.5px solid rgba(28,25,23,0.14)',
            boxShadow: '0 4px 20px rgba(28,25,23,0.08)',
            width: 160,
            overflow: 'hidden',
            mt: '4px',
            padding: 0,
          },
        },
      }}
    >
      {items?.map(({ label, action, icon, variant }, index) => {
        const isDanger = variant === 'danger'
        const isLast = index === items.length - 1
        return (
          <MenuItem
            key={index}
            onClick={action}
            sx={{
              padding: '13px 16px',
              gap: '10px',
              fontSize: 14,
              fontWeight: 500,
              color: isDanger ? '#dc2626' : '#1c1917',
              borderBottom: !isLast ? '0.5px solid rgba(28,25,23,0.09)' : 'none',
              fontFamily: 'inherit',
              minHeight: 'unset',
              '&:hover': { background: '#f9f6f1' },
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', color: isDanger ? '#dc2626' : '#1a7a93', fontSize: 16 }}>
              {icon}
            </span>
            {label}
          </MenuItem>
        )
      })}
    </MUIMenu>
  )
}
