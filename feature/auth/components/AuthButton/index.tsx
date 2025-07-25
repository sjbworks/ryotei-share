'use client'
import { Button } from '@/component'
import { PROVIDERS } from '@/feature/auth'
import { Provider } from '@supabase/auth-js'

export const AuthButton = ({ login }: { login: (provider: Provider) => void }) => {
  return (
    <>
      {PROVIDERS.map((provider) => (
        <Button onClick={() => login(provider)} key={provider}>
          {provider}でログイン
        </Button>
      ))}
    </>
  )
}
