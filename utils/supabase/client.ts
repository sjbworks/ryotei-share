import { createBrowserClient } from '@supabase/ssr'
import { envPublic } from '@/utils/env-public'

export function createClient() {
  return createBrowserClient(envPublic.NEXT_PUBLIC_SUPABASE_URL, envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
