import { NextResponse, NextRequest } from 'next/server'
import { createClientForServer } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClientForServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { message, context } = body as { message: string; context?: Record<string, unknown> }
    console.error('[client-error]', message, context ?? '')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
