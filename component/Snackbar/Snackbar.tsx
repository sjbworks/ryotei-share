import MUISnackbar, { SnackbarProps } from '@mui/material/Snackbar'

export const Snackbar = (muiProps: SnackbarProps) => {
  const { children, ...props } = muiProps
  return <MUISnackbar {...props}>{children}</MUISnackbar>
}
