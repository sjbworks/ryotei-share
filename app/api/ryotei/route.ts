import { createClient } from '@/utils/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    const { data } = await supabase.from('ryotei').select('id, description, datetime').eq('user_id', userId)
    return NextResponse.json({ success: true, data, body: data })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error })
  }
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
