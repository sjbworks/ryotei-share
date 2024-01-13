'use client'
import { AuthButton } from '@/component'

export default function Login() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'

  return (
    <main className={containerStyle}>
      <AuthButton />
    </main>
  )
}
