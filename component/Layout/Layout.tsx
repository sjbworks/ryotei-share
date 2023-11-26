'use client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
}
export const Layout = ({ children, onClick }: Props) => {
  return (
    <Box>
      <header>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClick}>共有する</Button>
        </Box>
      </header>
      {children}
    </Box>
  )
}
