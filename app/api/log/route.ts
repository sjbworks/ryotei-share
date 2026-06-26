import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, context } = body as { message: string; context?: Record<string, unknown> }
    console.error('[client-error]', message, context ?? '')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
