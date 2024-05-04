import { createClient } from '@/utils/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest, _res: NextResponse) {
  const supabase = createClient()
  const userId = (await supabase.auth.getUser()).data.user?.id
  const { error } = await supabase.from('ryotei').select(`id, date, description`).eq('user_id', userId)
  if (error) return NextResponse.json({ message: error.message })
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    const body = await new Response(req.body).json()
    const ryoteiData = { ...body, user_id: userId }
    await supabase.from('ryotei').insert(ryoteiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error })
  }
}
