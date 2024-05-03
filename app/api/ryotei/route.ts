import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'
import { format } from 'date-fns'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const userId = (await supabase.auth.getUser()).data.user?.id
  const { error } = await supabase.from('ryotei').select(`id, date, description`).eq('user_id', userId)
  if (error) return NextResponse.json({ message: error.message })
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const userId = (await supabase.auth.getUser()).data.user?.id
  console.log(userId)
  const body = await new Response(req.body).json()
  const data = { ...body, user_id: userId }
  const { error } = await supabase.from('ryotei').insert(data)
  if (error) return NextResponse.json({ message: error.message })
}
