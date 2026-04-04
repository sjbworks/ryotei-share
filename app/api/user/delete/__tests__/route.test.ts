/**
 * @jest-environment node
 */
import { DELETE } from '../route'

jest.mock('@/utils/supabase/server', () => ({
  createClientForServer: jest.fn(),
}))

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}))

import { createClientForServer } from '@/utils/supabase/server'
import { createClient } from '@supabase/supabase-js'

const mockCreateClientForServer = createClientForServer as jest.MockedFunction<typeof createClientForServer>
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>

function createMockAdminClient({ deleteUserError = null as object | null } = {}) {
  return {
    auth: {
      admin: {
        deleteUser: jest.fn().mockResolvedValue({ error: deleteUserError }),
      },
    },
  }
}

function createMockSupabaseClient({
  user = { id: 'test-user-id' } as object | null,
  authError = null as object | null,
  ryoteiError = null as object | null,
  tripsError = null as object | null,
} = {}) {
  const mockRyoteiEq = jest.fn().mockResolvedValue({ error: ryoteiError })
  const mockRyoteiDelete = jest.fn().mockReturnValue({ eq: mockRyoteiEq })
  const mockTripsEq = jest.fn().mockResolvedValue({ error: tripsError })
  const mockTripsDelete = jest.fn().mockReturnValue({ eq: mockTripsEq })

  const mockFrom = jest.fn((table: string) => {
    if (table === 'ryotei') return { delete: mockRyoteiDelete }
    if (table === 'trips') return { delete: mockTripsDelete }
    return {}
  })

  return {
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user }, error: authError }),
    },
    from: mockFrom,
    _mocks: { mockRyoteiEq, mockRyoteiDelete, mockTripsEq, mockTripsDelete, mockFrom },
  }
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key'
})

describe('DELETE /api/user/delete', () => {
  it('returns 401 when user is not authenticated', async () => {
    const mockClient = createMockSupabaseClient({ user: null })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await DELETE()
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body.error).toBe('Unauthorized')
  })

  it('returns 401 when auth error occurs', async () => {
    const mockClient = createMockSupabaseClient({ authError: { message: 'Auth error' } })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await DELETE()
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body.error).toBe('Unauthorized')
  })

  it('returns 500 when ryotei deletion fails', async () => {
    const mockClient = createMockSupabaseClient({
      ryoteiError: { message: 'Ryotei delete failed' },
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await DELETE()
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body.error).toBe('Failed to delete ryotei data')
  })

  it('returns 500 when trips deletion fails', async () => {
    const mockClient = createMockSupabaseClient({
      tripsError: { message: 'Trips delete failed' },
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await DELETE()
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body.error).toBe('Failed to delete trips data')
  })

  it('returns 500 when user account deletion fails', async () => {
    const mockClient = createMockSupabaseClient()
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const adminClient = createMockAdminClient({ deleteUserError: { message: 'Delete user failed' } })
    mockCreateClient.mockReturnValue(adminClient as never)

    const response = await DELETE()
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body.error).toBe('Failed to delete user account')
  })

  it('returns 200 and success message when all deletions succeed', async () => {
    const mockClient = createMockSupabaseClient()
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const adminClient = createMockAdminClient()
    mockCreateClient.mockReturnValue(adminClient as never)

    const response = await DELETE()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.message).toBe('User account and all associated data deleted successfully')
  })

  it('deletes ryotei and trips filtered by user ID', async () => {
    const userId = 'test-user-id'
    const mockClient = createMockSupabaseClient({ user: { id: userId } })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const adminClient = createMockAdminClient()
    mockCreateClient.mockReturnValue(adminClient as never)

    await DELETE()

    expect(mockClient._mocks.mockRyoteiEq).toHaveBeenCalledWith('user_id', userId)
    expect(mockClient._mocks.mockTripsEq).toHaveBeenCalledWith('user_id', userId)
    expect(adminClient.auth.admin.deleteUser).toHaveBeenCalledWith(userId)
  })

  it('creates admin client with service role key', async () => {
    const mockClient = createMockSupabaseClient()
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const adminClient = createMockAdminClient()
    mockCreateClient.mockReturnValue(adminClient as never)

    await DELETE()

    expect(mockCreateClient).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'service-role-key',
      expect.objectContaining({
        auth: expect.objectContaining({ autoRefreshToken: false, persistSession: false }),
      })
    )
  })
})
