import { Provider } from '@supabase/gotrue-js'
import { createClient } from '@/utils/supabase/client'

export async function login(provider: Provider) {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    },
  })
}
