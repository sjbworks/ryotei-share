'use client'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { FC, ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  children: ReactNode
  className?: string
}
export const BottomSheet: FC<Props> = (props) => {
  const { open, onClose, onOpen, children, className } = props
  return (
    <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen} anchor="bottom" className={className}>
      {children}
    </SwipeableDrawer>
  )
}
