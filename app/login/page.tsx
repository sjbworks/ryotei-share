'use client'
import { AuthButton } from '@/feature/auth/components/AuthButton'
import { login } from '@/feature/auth/api'
import Image from 'next/image'
import World from '@/assets/image/world.png'
import { Text } from '@/component/Text'

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center gap-4" style={{ flex: 1 }}>
      <Text variant="h5" color="grey.800" fontWeight={'800'}>
        Ryotei Share
      </Text>
      <Text
        variant="body1"
        color="grey.600"
        fontWeight={'800'}
        style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
      >
        旅程を無料で簡単につくれる{'\n'}Webサービスです。
      </Text>
      <Image src={World} alt="Walking Man" width={150} height={150} style={{ margin: 28 }} />
      <AuthButton login={login} />
    </div>
  )
}
