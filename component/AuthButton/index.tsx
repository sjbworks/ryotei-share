'use client'
import { Button } from '@/component'
import { PROVIDERS, auth } from '@/feature/auth'

export const AuthButton = () => {
  const { signIn } = auth()
  return (
    <>
      {PROVIDERS.map((provider) => (
        <Button onClick={() => signIn(provider)} key={provider}>
          {provider}でログイン
        </Button>
      ))}
    </>
  )
}
