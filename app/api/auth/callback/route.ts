import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Handles OAuth callback from Supabase authentication
 * Exchanges the authorization code for a user session and redirects to the appropriate page
 * Supports both development and production environments with proper host handling
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  // Validate redirect URL to prevent open redirect attacks
  const isValidRedirectUrl = (url: string): boolean => {
    try {
      const redirectUrl = new URL(url, origin)
      return redirectUrl.origin === origin && !url.includes('..')
    } catch {
      return false
    }
  }

  const safeNext = isValidRedirectUrl(next) ? next : '/'
  // const response = NextResponse.redirect(`${origin}${safeNext}`)

  if (!code) {
    console.error('No code provided in the URL')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map(({ name, value }) => ({ name, value }))
      },
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          cookieStore.set({ name, value, ...options })
        })
      },
    },
  })
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (!error) {
    console.log('Code exchange successful, redirecting to:', safeNext)
    return NextResponse.redirect(`${origin}${safeNext}`)
  }
  // if (!error) {
  //   const isLocalEnv = process.env.NODE_ENV === 'development'
  //   if (isLocalEnv) {
  //     return NextResponse.redirect(`${origin}${safeNext}`)
  //   } else {
  //     // Validate x-forwarded-host to prevent host header injection
  //     const forwardedHost = request.headers.get('x-forwarded-host')
  //     const allowedHosts = process.env.ALLOWED_HOSTS?.split(',') || []

  //     if (forwardedHost && allowedHosts.includes(forwardedHost)) {
  //       return NextResponse.redirect(`https://${forwardedHost}${safeNext}`)
  //     } else {
  //       return NextResponse.redirect(`${origin}${safeNext}`)
  //     }
  //   }
  // }

  console.error('exchangeCodeForSession error:', error)

  // return response
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
