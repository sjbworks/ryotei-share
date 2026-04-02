/**
 * @jest-environment node
 */
import { GET } from '../route'

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(),
}))

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const mockCookies = cookies as jest.MockedFunction<typeof cookies>
const mockCreateServerClient = createServerClient as jest.MockedFunction<typeof createServerClient>

function createMockCookieStore() {
  return {
    getAll: jest.fn().mockReturnValue([]),
    set: jest.fn(),
  }
}

function createMockSupabaseClient({ exchangeError = null as object | null } = {}) {
  return {
    auth: {
      exchangeCodeForSession: jest.fn().mockResolvedValue({ error: exchangeError }),
    },
  }
}

function makeRequest(url: string, headers: Record<string, string> = {}) {
  return new Request(url, { headers })
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key'
  Object.assign(process.env, { NODE_ENV: 'development' })
  delete process.env.ALLOWED_HOSTS

  const cookieStore = createMockCookieStore()
  mockCookies.mockResolvedValue(cookieStore as never)

  const supabaseClient = createMockSupabaseClient()
  mockCreateServerClient.mockReturnValue(supabaseClient as never)
})

describe('GET /api/auth/callback', () => {
  it('redirects to auth-code-error when code is missing', async () => {
    const request = makeRequest('http://localhost/api/auth/callback')

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/auth/auth-code-error')
  })

  it('redirects to auth-code-error when Supabase env vars are missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123')

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/auth/auth-code-error')
  })

  it('redirects to origin root on success in development', async () => {
    Object.assign(process.env, { NODE_ENV: 'development' })
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123')

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/')
  })

  it('redirects to next param on success in development', async () => {
    Object.assign(process.env, { NODE_ENV: 'development' })
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123&next=/dashboard')

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/dashboard')
  })

  it('redirects to x-forwarded-host when valid in production', async () => {
    Object.assign(process.env, { NODE_ENV: 'production' })
    process.env.ALLOWED_HOSTS = 'myapp.vercel.app,other.com'
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123', {
      'x-forwarded-host': 'myapp.vercel.app',
    })

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://myapp.vercel.app/')
  })

  it('falls back to origin when x-forwarded-host is not in allowed list in production', async () => {
    Object.assign(process.env, { NODE_ENV: 'production' })
    process.env.ALLOWED_HOSTS = 'allowed.com'
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123', {
      'x-forwarded-host': 'malicious.com',
    })

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/')
  })

  it('redirects to origin when x-forwarded-host is absent in production', async () => {
    Object.assign(process.env, { NODE_ENV: 'production' })
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123')

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/')
  })

  it('redirects to origin when exchangeCodeForSession fails', async () => {
    const supabaseClient = createMockSupabaseClient({ exchangeError: { message: 'Exchange failed' } })
    mockCreateServerClient.mockReturnValue(supabaseClient as never)

    const request = makeRequest('http://localhost/api/auth/callback?code=abc123')

    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/')
  })

  it('redirects to root when next param contains path traversal', async () => {
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123&next=/../secret')

    const response = await GET(request)

    expect(response.headers.get('location')).toBe('http://localhost/')
  })

  it('redirects to root when next param is an external URL', async () => {
    const request = makeRequest('http://localhost/api/auth/callback?code=abc123&next=https://evil.com')

    const response = await GET(request)

    expect(response.headers.get('location')).toBe('http://localhost/')
  })
})
