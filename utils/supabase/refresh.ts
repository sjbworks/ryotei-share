
import { createClient } from '@/utils/supabase/client'

export async function refreshAccessToken() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.refreshSession()
    if (error) {
        console.error('Error refreshing token:', error)
        return null
    }
    // refreshSession() が sb-<ref>-auth-token クッキーを正しい形式で自動更新するため、
    // 手動での document.cookie 書き込みは行わない（生トークンで上書きすると形式が壊れる）
    return data.session?.access_token ?? null
}