'use client'
import { AuthButton } from '@/feature/auth/components/AuthButton'
import { login } from '@/feature/auth/api'
import Image from 'next/image'
import Link from 'next/link'
import WalkingManSvg from '@/assets/svg/WalkingMan.svg'

export default function Login() {
  const containerStyle = 'flex flex-col justify-center items-center min-h-screen gap-2'
  const containerStyle2 = 'min-h-screen flex flex-col'
  const mobileStyle = { minHeight: '-webkit-fill-available' }

  return (
    <div className={containerStyle2} style={mobileStyle}>
      <main className={containerStyle}>
        <Image src={WalkingManSvg} alt="Walking Man" width={150} height={150} />
        <AuthButton login={login} />
      </main>
      <footer className="absolute bottom-4 w-full text-center">
        <Link href="/legal" className="text-sm text-gray-500 hover:text-gray-700 underline">
          利用規約・プライバシーポリシー
        </Link>
      </footer>
    </div>
  )
}
