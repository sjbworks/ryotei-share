'use client'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { FC, ReactNode } from 'react'
import { Global, type GlobalProps } from '@emotion/react'
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
// const Puller = styled('div')(({ theme }) => ({
//   width: 30,
//   height: 6,
//   backgroundColor: grey[300],
//   borderRadius: 3,
//   position: 'absolute',
//   top: 8,
//   left: 'calc(50% - 15px)',
//   ...theme.applyStyles('dark', {
//     backgroundColor: grey[900],
//   }),
// }));
export const LeftSideDrawer: FC<Props> = (props) => {
  const { open, onClose, onOpen, children, className, anchor } = props
  // const StyledBox = styled('div')(({ theme }) => ({
  //   backgroundColor: '#fff',
  //   ...theme.applyStyles('dark', {
  //     backgroundColor: grey[800],
  //   }),
  // }))

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            width: `calc(50% - ${drawerBleeding}px)`,
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
            width: '50vw',
            height: '100vh',
            borderRadius: '0 12px 12px 0',
            padding: '24px 0 16px 16px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box>{children}</Box>

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
