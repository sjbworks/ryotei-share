import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase/client'
// import { supabase } from '@/utils/supabase/client'

// Define your API routes here
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (await supabase.auth.getUser()).data.user?.id
  // Handle different API routes based on the request method
  if (req.method === 'GET') {
    const { error } = await supabase.from('ryotei').select(`id, date, description`).eq('user_id', userId)
    if (error) return res.status(401).json({ error: error.message })
  } else if (req.method === 'POST') {
    const data = { ...req.body, user_id: userId }
    const { error } = await supabase.from('ryotei').insert(data)
    if (error) return res.status(401).json({ error: error.message })
  } else if (req.method === 'PUT') {
    // Handle PUT request
    // Your code here
  } else if (req.method === 'DELETE') {
    // Handle DELETE request
    // Your code here
  } else {
    // Handle unsupported request methods
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
