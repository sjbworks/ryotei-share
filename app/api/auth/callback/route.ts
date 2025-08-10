import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const runtime = 'edge'

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

  // Edge Runtime対応のcookie処理
  const requestHeaders = new Headers(request.headers)
  const cookieHeader = requestHeaders.get('cookie') || ''

  // Cookieを解析
  const parseCookies = (cookieString: string) => {
    const cookies: { [key: string]: string } = {}
    cookieString.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=')
      if (name && value) {
        cookies[name] = decodeURIComponent(value)
      }
    })
    return cookies
  }

  const cookies = parseCookies(cookieHeader)
  const response = NextResponse.redirect(`${origin}${safeNext}`)

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return Object.entries(cookies).map(([name, value]) => ({ name, value }))
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          // Edge Runtime対応のcookie設定
          let cookieString = `${name}=${encodeURIComponent(value)}`

          if (options?.maxAge) {
            cookieString += `; Max-Age=${options.maxAge}`
          }
          if (options?.expires) {
            cookieString += `; Expires=${options.expires.toUTCString()}`
          }
          if (options?.domain) {
            cookieString += `; Domain=${options.domain}`
          }
          if (options?.path) {
            cookieString += `; Path=${options.path}`
          }
          if (options?.secure) {
            cookieString += `; Secure`
          }
          if (options?.httpOnly) {
            cookieString += `; HttpOnly`
          }
          if (options?.sameSite) {
            cookieString += `; SameSite=${options.sameSite}`
          }

          response.headers.append('Set-Cookie', cookieString)
        })
      },
    },
  })

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (!error) {
    const isLocalEnv = process.env.NODE_ENV === 'development'
    if (isLocalEnv) {
      return response
    } else {
      // Validate x-forwarded-host to prevent host header injection
      const forwardedHost = request.headers.get('x-forwarded-host')
      const allowedHosts = process.env.ALLOWED_HOSTS?.split(',') || []

      if (forwardedHost && allowedHosts.includes(forwardedHost)) {
        const finalResponse = NextResponse.redirect(`https://${forwardedHost}${safeNext}`)
        // Set-Cookieヘッダーをコピー
        response.headers.getSetCookie().forEach((cookie) => {
          finalResponse.headers.append('Set-Cookie', cookie)
        })
        return finalResponse
      } else {
        return response
      }
    }
  }

  console.error('exchangeCodeForSession error:', error)

  // エラー時もcookieを設定して返す
  return response
}
