'use client'
import { Button } from '@/component'
import { PROVIDERS, PROVIDER_LABELS } from '@/feature/auth'
import { Provider } from '@supabase/auth-js'

export const AuthButton = ({ login }: { login: (provider: Provider) => void }) => {
  return (
    <>
      {PROVIDERS.map((provider) => (
        <Button onClick={() => login(provider as Provider)} key={provider}>
          {PROVIDER_LABELS[provider]}でログイン
        </Button>
      ))}
    </>
  )
}
