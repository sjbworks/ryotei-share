
import { createClient } from '@/utils/supabase/client'
import { envPublic } from '@/utils/env-public'

export async function refreshAccessToken() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.refreshSession()
    if (error) {
        console.error('Error refreshing token:', error)
        return null
    }
    const newToken = data.session?.access_token
    if (newToken) {
        // Save new token to cookies or your preferred storage
        document.cookie = `sb-${envPublic.NEXT_PUBLIC_SUPABASE_PROJECT_ID}-auth-token=${newToken}; path=/`
    }
    return newToken
}