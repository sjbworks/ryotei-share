'use client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  logout: () => void
  onClick?: () => void
}
export const Layout = ({ children, onClick, logout }: Props) => {
  return (
    <Box>
      <header>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => logout()}>ログアウト</Button>
        </Box>
      </header>
      {children}
      <footer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClick}>共有する</Button>
        </Box>
      </footer>
    </Box>
  )
}
