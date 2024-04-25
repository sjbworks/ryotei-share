'use client'
import { AuthButton } from '@/feature/auth/components'

export default function Login() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'

  return (
    <main className={containerStyle}>
      <AuthButton />
    </main>
  )
}
