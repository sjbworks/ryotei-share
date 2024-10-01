'use client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/feature/auth/api'

type Props = {
  children: ReactNode
  onClick?: () => void
}
export const Layout = ({ children, onClick }: Props) => {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }
  return (
    <Box>
      <header>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleLogout()}>ログアウト</Button>
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
