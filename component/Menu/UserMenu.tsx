'use client'
import Popover from '@mui/material/Popover'
import ButtonBase from '@mui/material/ButtonBase'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import ArticleIcon from '@mui/icons-material/Article'
import { Text } from '@/component/Text'

type Props = {
  open: boolean
  anchorEl: HTMLElement | null
  onClose: () => void
  email?: string | null
  name?: string | null
  onLogout: () => void
  onWithdraw: () => void
  onLegal: () => void
}

type RowProps = {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: 'danger' | 'muted'
  isLast?: boolean
}

const Row = ({ icon, label, onClick, variant, isLast }: RowProps) => {
  const isDanger = variant === 'danger'
  const isMuted = variant === 'muted'
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: '100%',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'flex-start',
        fontSize: isMuted ? 11 : 14,
        fontWeight: isMuted ? 400 : 500,
        color: isDanger ? '#dc2626' : isMuted ? '#a8a29e' : '#1c1917',
        borderBottom: !isLast ? '0.5px solid rgba(28,25,23,0.09)' : 'none',
        fontFamily: 'inherit',
        '&:hover': { background: '#f9f6f1' },
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', color: isDanger ? '#dc2626' : isMuted ? '#a8a29e' : '#1a7a93', fontSize: isDanger || !isMuted ? 17 : 15 }}>
        {icon}
      </span>
      {label}
    </ButtonBase>
  )
}

export const UserMenu = ({ open, anchorEl, onClose, email, name, onLogout, onWithdraw, onLegal }: Props) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            border: '0.5px solid rgba(28,25,23,0.14)',
            boxShadow: '0 4px 20px rgba(28,25,23,0.08)',
            width: 240,
            overflow: 'hidden',
            mt: '4px',
          },
        },
      }}
    >
      <div
        style={{
          padding: '14px 16px 12px',
          borderBottom: '0.5px solid rgba(28,25,23,0.09)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#fff3eb',
            border: '0.5px solid #ffd4b3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 19, color: '#c45d1a' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          {name && (
            <Text
              noWrap
              sx={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}
            >
              {name}
            </Text>
          )}
          {email && (
            <Text
              noWrap
              sx={{ fontSize: 11, color: 'var(--ink-3)', mt: name ? '1px' : 0 }}
            >
              {email}
            </Text>
          )}
        </div>
      </div>
      <Row icon={<LogoutIcon />} label="ログアウト" onClick={() => { onClose(); onLogout() }} />
      <Row icon={<PersonRemoveIcon />} label="退会" onClick={() => { onClose(); onWithdraw() }} variant="danger" />
      <Row icon={<ArticleIcon />} label="利用規約・プライバシーポリシー" onClick={() => { onClose(); onLegal() }} variant="muted" isLast />
    </Popover>
  )
}
