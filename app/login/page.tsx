'use client'
import { AuthButton } from '@/feature/auth/components/AuthButton'
import { login } from '@/feature/auth/api'
import Image from 'next/image'
import Link from 'next/link'
import WalkingManSvg from '@/assets/svg/WalkingMan.svg'
import { Typography } from '@mui/material'

export default function Login() {
  const containerStyle = 'flex flex-col justify-center items-center gap-4'

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: '100dvh',
      }}
    >
      <main className={containerStyle} style={{ flex: 1 }}>
        <Typography variant="h5" color="grey.800">
          Ryotei Share
        </Typography>
        <Typography variant="body1" color="grey.600" style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          旅程を無料で簡単につくれる{'\n'}Webサービスです。
        </Typography>
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
