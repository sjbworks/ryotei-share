'use client'
import { default as MUIButton } from '@mui/material/Button'
import { SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text'

type Props = {
  children: string | ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  size?: 'small' | 'medium' | 'large'
  className?: string
  sx?: SxProps<Theme>
  disabled?: boolean
  startIcon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const getVariantSx = (variant: ButtonVariant): SxProps<Theme> => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: 'var(--sun)',
        color: '#fff',
        border: 'none',
        '&:hover': { backgroundColor: 'var(--sun-dark)' },
        '&.Mui-disabled': { backgroundColor: 'var(--sun-mid)', color: 'rgba(255,255,255,0.6)', border: 'none' },
      }
    case 'secondary':
      return {
        backgroundColor: '#fff',
        color: 'var(--ink-2)',
        borderColor: 'var(--border-md)',
        '&:hover': { backgroundColor: 'var(--sand)', borderColor: 'var(--border-md)' },
      }
    case 'danger':
      return {
        backgroundColor: '#dc2626',
        color: '#fff',
        border: 'none',
        '&:hover': { backgroundColor: '#b91c1c' },
        '&.Mui-disabled': { backgroundColor: '#fca5a5', color: 'rgba(255,255,255,0.6)', border: 'none' },
      }
    case 'text':
      return {
        backgroundColor: 'transparent',
        color: 'var(--ink)',
        border: 'none',
        '&:hover': { backgroundColor: 'rgba(28,25,23,0.04)' },
      }
  }
}

const getSizeSx = (size: 'small' | 'medium' | 'large'): SxProps<Theme> => {
  switch (size) {
    case 'small':
      return { height: 36, fontSize: 13 }
    case 'large':
      return { height: 52, fontSize: 15 }
    default:
      return { height: 48, fontSize: 14 }
  }
}

export const Button = ({
  className,
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  sx,
  disabled,
  startIcon,
  type = 'button',
  fullWidth,
}: Props) => {
  const muiVariant = variant === 'secondary' ? 'outlined' : variant === 'text' ? 'text' : 'contained'
  const sxArray: SxProps<Theme> = [
    {
      fontFamily: 'inherit',
      textTransform: 'none' as const,
      borderRadius: '14px',
      fontWeight: 500,
    },
    getSizeSx(size),
    getVariantSx(variant),
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ]

  return (
    <MUIButton
      className={className}
      onClick={onClick}
      variant={muiVariant}
      size={size}
      disableElevation
      sx={sxArray}
      disabled={disabled}
      startIcon={startIcon}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </MUIButton>
  )
}
