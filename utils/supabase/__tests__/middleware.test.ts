/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { updateSession } from '../middleware'

const mockGetUser = jest.fn()
const mockSignOut = jest.fn()

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
    },
  })),
}))

function createRequest(pathname: string) {
  return new NextRequest(`http://localhost${pathname}`)
}

describe('updateSession', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
  })

  describe('authenticated user', () => {
    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })
    })

    it('passes through request for protected routes', async () => {
      const response = await updateSession(createRequest('/dashboard'))
      expect(response.headers.get('location')).toBeNull()
    })

    it('passes through request for nested protected routes', async () => {
      const response = await updateSession(createRequest('/settings/profile'))
      expect(response.headers.get('location')).toBeNull()
    })
  })

  describe('unauthenticated user - redirect behavior', () => {
    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null })
    })

    it('redirects to /login for nested protected routes', async () => {
      const response = await updateSession(createRequest('/settings/profile'))
      expect(response.headers.get('location')).toContain('/login')
    })

    it('does not redirect for /login path', async () => {
      const response = await updateSession(createRequest('/login'))
      expect(response.headers.get('location')).toBeNull()
    })

    it('does not redirect for /auth path', async () => {
      const response = await updateSession(createRequest('/auth/callback'))
      expect(response.headers.get('location')).toBeNull()
    })
  })

  describe('share page detection', () => {
    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null })
    })

    it('treats single-segment path as a share page and does not redirect', async () => {
      const response = await updateSession(createRequest('/abc123'))
      expect(response.headers.get('location')).toBeNull()
    })

    it('treats single-segment path with trailing slash as a share page and does not redirect', async () => {
      const response = await updateSession(createRequest('/abc123/'))
      expect(response.headers.get('location')).toBeNull()
    })

    it('does not redirect from /legal (public page)', async () => {
      const response = await updateSession(createRequest('/legal'))
      expect(response.headers.get('location')).toBeNull()
    })

    it('redirects from nested paths (not a share page)', async () => {
      const response = await updateSession(createRequest('/share/abc123'))
      expect(response.headers.get('location')).toContain('/login')
    })
  })

  describe('auth error handling', () => {
    it('calls signOut when refresh_token_not_found error occurs', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'refresh_token_not_found' },
      })

      await updateSession(createRequest('/login'))

      expect(mockSignOut).toHaveBeenCalledTimes(1)
    })

    it('does not call signOut for unrelated errors', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'network error' },
      })

      await updateSession(createRequest('/login'))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    it('redirects after refresh_token_not_found error on protected route', async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'refresh_token_not_found' },
      })

      const response = await updateSession(createRequest('/settings/profile'))

      expect(mockSignOut).toHaveBeenCalledTimes(1)
      expect(response.headers.get('location')).toContain('/login')
    })
  })
})
