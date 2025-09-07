'use client'
import { default as MUIButton, ButtonTypeMap } from '@mui/material/Button'
import { SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: string | ReactNode
  onClick: () => void
  variant?: ButtonTypeMap['props']['variant']
  color?: ButtonTypeMap['props']['color']
  size?: ButtonTypeMap['props']['size']
  className?: string
  sx?: SxProps<Theme>
  disabled?: boolean
}

export const Button = (props: Props) => {
  const { className, children, onClick, variant = 'outlined', color = 'primary', size = 'medium', sx, disabled } = props
  const sxProps = { backgroundColor: 'primary', fontFamily: 'inherit', textTransform: 'none' as const, ...sx }
  return (
    <MUIButton
      className={className}
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disableElevation
      sx={sxProps}
      disabled={disabled}
    >
      {children}
    </MUIButton>
  )
}
