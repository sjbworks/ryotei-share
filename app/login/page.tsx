'use client'
import { AuthButton } from '@/feature/auth/components/AuthButton'
import { login } from '@/feature/auth/api'
import Image from 'next/image'
import WalkingManSvg from '@/assets/svg/WalkingMan.svg'

export default function Login() {
  const containerStyle = 'flex flex-col justify-center items-center h-screen gap-2'

  return (
    <main className={containerStyle}>
      <Image src={WalkingManSvg} alt="Walking Man" width={150} height={150} />
      <AuthButton login={login} />
    </main>
  )
}
