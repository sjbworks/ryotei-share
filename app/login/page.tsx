'use client'
import { AuthButton } from '@/feature/auth/components/AuthButton'
import { login } from '@/feature/auth/api'

export default function Login() {
  const containerStyle = 'flex flex-col justify-center items-center h-screen gap-2'

  return (
    <main className={containerStyle}>
      <AuthButton login={login} />
    </main>
  )
}
