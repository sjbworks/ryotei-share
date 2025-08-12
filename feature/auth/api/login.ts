import { Provider } from '@supabase/auth-js'
import { createClient } from '@/utils/supabase/client'

export async function login(provider: Provider) {
  const getURL = () => {
    let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/' // Automatically set by Vercel.
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${getURL()}/api/auth/callback`,
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
