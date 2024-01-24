'use client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
  children: ReactNode
  onClick?: () => void
}
export const Layout = ({ children, onClick }: Props) => {
  const supabase = createClientComponentClient()
  const handleSignOut = async () => await supabase.auth.signOut()

  return (
    <Box>
      <header>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSignOut}>ログアウト</Button>
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
