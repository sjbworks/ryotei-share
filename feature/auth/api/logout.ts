'use server'
import { createClientForServer } from '@/utils/supabase/server'

export async function logout() {
  const supabase = createClientForServer()
  await supabase.auth.signOut()
}
