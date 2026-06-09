import { Typography, TypographyOwnProps, SxProps } from '@mui/material'
import { ReactNode, CSSProperties, ElementType } from 'react'

type Props = {
  children: ReactNode
  className?: string
  variant?: TypographyOwnProps['variant']
  color?: TypographyOwnProps['color']
  fontWeight?: TypographyOwnProps['fontWeight']
  style?: CSSProperties
  component?: ElementType
  sx?: SxProps
  noWrap?: boolean
}

export const Text = ({ children, ...textProps }: Props) => {
  return (
    <Typography fontFamily={'inherit'} {...textProps}>
      {children}
    </Typography>
  )
}
