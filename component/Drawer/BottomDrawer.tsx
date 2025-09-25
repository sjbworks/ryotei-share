'use client'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { FC, ReactNode } from 'react'
import { Global } from '@emotion/react'

type Props = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  children: ReactNode
  className?: string
}

export const BottomDrawer: FC<Props> = (props) => {
  const { open, onClose, onOpen, children, className } = props

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            width: '100%',
            overflow: 'visible',
            height: 'calc(100% - 64px)',
          },
        }}
      />
      <SwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        anchor="bottom"
        className={className}
        sx={{ width: 100 }}
      >
        {children}
      </SwipeableDrawer>
    </>
  )
}
