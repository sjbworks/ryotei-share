import { default as MUIButton, ButtonTypeMap } from '@mui/material/Button'

type Props = {
  children: string
  onClick: () => void
  variant?: ButtonTypeMap['props']['variant']
  color?: ButtonTypeMap['props']['color']
  size?: ButtonTypeMap['props']['size']
  className?: string
}

export const Button = (props: Props) => {
  const { className, children, onClick, variant = 'outlined', color = 'primary', size = 'medium' } = props
  return (
    <MUIButton className={className} onClick={onClick} variant={variant} color={color} size={size}>
      {children}
    </MUIButton>
  )
}
