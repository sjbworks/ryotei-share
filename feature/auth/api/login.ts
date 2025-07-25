import { Provider } from '@supabase/auth-js'
import { createClient } from '@/utils/supabase/client'

export async function login(provider: Provider) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    
    if (error) {
      console.error('Login error:', error)
      throw new Error(`Failed to login with ${provider}: ${error.message}`)
    }
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
