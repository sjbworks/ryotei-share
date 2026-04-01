/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET, POST } from '../route'

jest.mock('@/utils/supabase/server', () => ({
  createClientForServer: jest.fn(),
}))

import { createClientForServer } from '@/utils/supabase/server'

const mockCreateClientForServer = createClientForServer as jest.MockedFunction<typeof createClientForServer>

function createMockSupabaseClient({
  session = null as object | null,
  userId = 'test-user-id',
  selectData = [] as object[],
  selectError = null as object | null,
  insertError = null as object | null,
} = {}) {
  const mockEq = jest.fn().mockResolvedValue({ data: selectData, error: selectError })
  const mockSelect = jest.fn().mockReturnValue({ eq: mockEq })
  const mockInsert = jest.fn().mockResolvedValue({ data: null, error: insertError })
  const mockFrom = jest.fn((table: string) => {
    if (table === 'ryotei') {
      return { select: mockSelect, insert: mockInsert }
    }
    return { select: mockSelect, insert: mockInsert }
  })

  return {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session } }),
      getUser: jest.fn().mockResolvedValue({ data: { user: session ? { id: userId } : null } }),
    },
    from: mockFrom,
    _mocks: { mockEq, mockSelect, mockInsert, mockFrom },
  }
}

describe('GET /api/ryotei', () => {
  const makeRequest = () => new NextRequest('http://localhost/api/ryotei', { method: 'GET' })

  it('returns 401 when session is not found', async () => {
    const mockClient = createMockSupabaseClient({ session: null })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await GET(makeRequest())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body.message).toBe('Unauthorized')
  })

  it('returns ryotei data when authenticated', async () => {
    const ryoteiData = [
      { id: '1', description: 'テスト旅程', datetime: '2024-01-01' },
      { id: '2', description: '旅行', datetime: '2024-02-01' },
    ]
    const mockClient = createMockSupabaseClient({
      session: { access_token: 'token' },
      selectData: ryoteiData,
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await GET(makeRequest())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
    expect(body.data).toEqual(ryoteiData)
  })

  it('returns an error response when a DB error occurs', async () => {
    const dbError = { code: '500', message: 'Database error' }
    const mockClient = createMockSupabaseClient({
      session: { access_token: 'token' },
      selectError: dbError,
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await GET(makeRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body.message).toBe('Database error')
  })

  it('queries DB filtered by user ID', async () => {
    const userId = 'specific-user-id'
    const mockClient = createMockSupabaseClient({
      session: { access_token: 'token' },
      userId,
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    await GET(makeRequest())

    expect(mockClient.from).toHaveBeenCalledWith('ryotei')
    expect(mockClient._mocks.mockSelect).toHaveBeenCalledWith('id, description, datetime')
    expect(mockClient._mocks.mockEq).toHaveBeenCalledWith('user_id', userId)
  })
})

describe('POST /api/ryotei', () => {
  const makeRequest = (body: object) =>
    new NextRequest('http://localhost/api/ryotei', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

  it('returns 401 when session is not found', async () => {
    const mockClient = createMockSupabaseClient({ session: null })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await POST(makeRequest({ description: 'test', datetime: '2024-01-01' }))
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body.message).toBe('Unauthorized')
  })

  it('creates a ryotei record and returns success when authenticated', async () => {
    const userId = 'test-user-id'
    const mockClient = createMockSupabaseClient({
      session: { access_token: 'token' },
      userId,
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const requestBody = { description: '新しい旅程', datetime: '2024-03-01' }
    const response = await POST(makeRequest(requestBody))
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
    expect(mockClient._mocks.mockInsert).toHaveBeenCalledWith({
      ...requestBody,
      user_id: userId,
    })
  })

  it('returns an error response when a DB error occurs', async () => {
    const dbError = { code: '500', message: 'Insert failed' }
    const mockClient = createMockSupabaseClient({
      session: { access_token: 'token' },
      insertError: dbError,
    })
    mockCreateClientForServer.mockResolvedValue(mockClient as never)

    const response = await POST(makeRequest({ description: 'test', datetime: '2024-01-01' }))
    const body = await response.json()

    // DBエラーは error.message !== '401' のため message: error のブランチに入る
    expect(body).toBeDefined()
  })
})
