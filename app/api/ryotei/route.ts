import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const userId = (await supabase.auth.getUser()).data.user?.id
  const { error } = await supabase.from('ryotei').select(`id, date, description`).eq('user_id', userId)
  if (error) return NextResponse.json({ message: error.message })
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const userId = (await supabase.auth.getUser()).data.user?.id
  const data = { ...req.body, user_id: userId }
  const { error } = await supabase.from('ryotei').insert(data)
  if (error) return NextResponse.json({ message: error.message })
}
