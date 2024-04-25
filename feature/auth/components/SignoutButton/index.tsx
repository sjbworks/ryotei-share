'use client'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { auth } from '@/feature/auth'

export const SignoutButton = () => {
  const { signOut } = auth()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => signOut()}>ログアウト</Button>
    </Box>
  )
}
