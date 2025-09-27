'use client'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { FC, ReactNode } from 'react'
import { Global } from '@emotion/react'
import Box from '@mui/material/Box'

type Props = {
  open: boolean
  onClose: () => void
  onOpen: () => void
  anchor: 'bottom' | 'left'
  children: ReactNode
  className?: string
}

const drawerBleeding = 56

const Puller = () => {
  return (
    <div
      style={{
        width: 30,
        height: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
      }}
    />
  )
}

export const LeftSideDrawer: FC<Props> = (props) => {
  const { open, onClose, onOpen, children, className, anchor } = props

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            width: `calc(100vw - 40px)`,
            overflow: 'visible',
          },
        }}
      />

      <SwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        anchor={anchor}
        className={className}
        swipeAreaWidth={drawerBleeding}
        sx={{
          '& .MuiDrawer-paper': {
            width: 'calc(100vw - 64px)',
            height: '100vh',
            borderRadius: '0 12px 12px 0',
            padding: '24px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
          {children}
        </Box>

        <Box
          sx={{
            left: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            backgroundColor: 'black',
          }}
        >
          <Puller />
        </Box>
      </SwipeableDrawer>
    </>
  )
}
