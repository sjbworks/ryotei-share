import { createClientForServer } from '@/utils/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

// export const runtime = 'edge'

const ERROR_CODE_UNAUTHORIZED = '401'

/**
 * Retrieves all ryotei records for the authenticated user
 * Validates user session and returns user-specific ryotei data including id, description, and datetime
 */
export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClientForServer()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session === null) throw new Error(ERROR_CODE_UNAUTHORIZED, { cause: 'Unauthorized' })
    const userId = (await supabase.auth.getUser()).data.user?.id
    const { data, error } = await supabase.from('ryotei').select('id, description, datetime').eq('user_id', userId)
    if (error) throw new Error(error.code, { cause: error.message })
    return NextResponse.json({ success: true, data, body: data })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return NextResponse.json({ message: error.cause }, { status: Number(error.message) })
    }
    return NextResponse.json({ message: error })
  }
}

/**
 * Creates a new ryotei record for the authenticated user
 * Validates user session, associates the record with the current user_id, and inserts the data into the database
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClientForServer()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session === null) throw new Error(ERROR_CODE_UNAUTHORIZED, { cause: 'Unauthorized' })
    const userId = (await supabase.auth.getUser()).data.user?.id
    const body = await new Response(req.body).json()
    const ryoteiData = { ...body, user_id: userId }
    const { error } = await supabase.from('ryotei').insert(ryoteiData)
    if (error) throw new Error(error.code, { cause: error.message })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_CODE_UNAUTHORIZED) {
      return NextResponse.json({ message: error.cause }, { status: Number(error.message) })
    }
    return NextResponse.json({ message: error })
  }
}
