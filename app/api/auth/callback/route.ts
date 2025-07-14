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
  const response = NextResponse.redirect(`${origin}${next}`)

  if (!code) {
    console.error('No code provided in the URL')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  )
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (!error) {
    const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
    const isLocalEnv = process.env.NODE_ENV === 'development'
    if (isLocalEnv) {
      // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
      return NextResponse.redirect(`${origin}`)
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}`)
    } else {
      return NextResponse.redirect(`${origin}`)
    }
  }

  console.error('exchangeCodeForSession error:', error)

  return response
}
