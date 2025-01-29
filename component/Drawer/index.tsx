'use client'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { FC, ReactNode } from 'react'
import { Global, type GlobalProps } from '@emotion/react';
type Props = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  anchor: 'bottom' | 'left'
  children: ReactNode
  className?: string
  styles?: GlobalProps['styles']
}
export const Drawer: FC<Props> = (props) => {
  const { open, onClose, onOpen, children, className, styles } = props
  return (
    <>
      {styles && <Global styles={styles} />}
      <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen} anchor="bottom" className={className} >
        {children}
      </SwipeableDrawer>
    </>
  )
}
