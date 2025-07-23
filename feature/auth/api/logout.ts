'use server'
import { createClientForServer } from '@/utils/supabase/server'

export async function logout() {
  try {
    const supabase = await createClientForServer()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Logout error:', error)
      throw new Error(`Failed to logout: ${error.message}`)
    }
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}
