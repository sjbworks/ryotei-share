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
}

export const Text = (props: Props) => {
  const { children, ...textProps } = props
  return (
    <Typography fontFamily={'inherit'} {...textProps}>
      {children}
    </Typography>
  )
}
