import { Provider } from '@supabase/auth-js'
import { createClient } from '@/utils/supabase/client'

export async function login(provider: Provider) {
  const getURL = () => {
    // In production, use the current window location or fallback to VERCEL_URL
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    
    let url = process?.env?.VERCEL_URL ?? 'http://localhost:3000' // Automatically set by Vercel.
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  try {
    const supabase = createClient()
    const redirectUrl = `${getURL()}api/auth/callback`
    console.log('Login redirect URL:', redirectUrl)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
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
