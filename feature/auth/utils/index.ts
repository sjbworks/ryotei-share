import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Provider } from '@supabase/gotrue-js'

export const auth = () => {
  const supabase = createClientComponentClient()

  const signIn = async (provider: Provider) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      // TODO: Handle error
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      // TODO: Handle error
    }
  }
  return { signIn, signOut }
}
