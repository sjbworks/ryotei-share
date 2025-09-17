import { createContext, useReducer, ReactNode } from 'react'
import { SnackbarProps } from '@mui/material/Snackbar'

const SnackbarContext = createContext<SnackbarProps | null>(null)
const SnackbarDispatchContext = createContext<((newState: Partial<SnackbarProps>) => void) | null>(null)

const snackbarReducer = (snackbarState: SnackbarProps, newState: Partial<SnackbarProps>): SnackbarProps => {
  return { ...snackbarState, ...newState }
}

const initialSnackbar: SnackbarProps = { message: '', open: false }

export const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, dispatch] = useReducer(snackbarReducer, initialSnackbar)
  return (
    <SnackbarContext.Provider value={snackbarState}>
      <SnackbarDispatchContext.Provider value={dispatch}>{children}</SnackbarDispatchContext.Provider>
    </SnackbarContext.Provider>
  )
}
