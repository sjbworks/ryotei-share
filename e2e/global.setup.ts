import { chromium } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

config({ path: '.env.local' })

const AUTH_FILE = 'playwright/.auth/user.json'

function chunkString(str: string, size: number): string[] {
  const chunks: string[] = []
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.substring(i, i + size))
  }
  return chunks
}

async function globalSetup() {
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const email = process.env.E2E_TEST_EMAIL
  const password = process.env.E2E_TEST_PASSWORD

  if (!email || !password || !supabaseUrl || !supabaseAnonKey) {
    console.log('E2E auth credentials not set. Skipping auth setup.')
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }))
    return
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    console.error('E2E sign-in failed:', error?.message)
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }))
    return
  }

  const { session } = data
  const projectRef = new URL(supabaseUrl).hostname.split('.')[0]
  const cookieName = `sb-${projectRef}-auth-token`
  const cookieValue = JSON.stringify({
    access_token: session.access_token,
    token_type: session.token_type,
    expires_in: session.expires_in,
    expires_at: session.expires_at,
    refresh_token: session.refresh_token,
    user: session.user,
  })

  const CHUNK_SIZE = 3600
  const chunks = chunkString(cookieValue, CHUNK_SIZE)
  const expiresAt = session.expires_at ?? Math.floor(Date.now() / 1000) + 3600

  const browser = await chromium.launch()
  const context = await browser.newContext()

  const cookies =
    chunks.length === 1
      ? [
          {
            name: cookieName,
            value: chunks[0],
            domain: 'localhost',
            path: '/',
            expires: expiresAt,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax' as const,
          },
        ]
      : chunks.map((chunk, i) => ({
          name: `${cookieName}.${i}`,
          value: chunk,
          domain: 'localhost',
          path: '/',
          expires: expiresAt,
          httpOnly: true,
          secure: false,
          sameSite: 'Lax' as const,
        }))

  await context.addCookies(cookies)
  await context.storageState({ path: AUTH_FILE })
  await browser.close()

  console.log('Auth setup complete.')
}

export default globalSetup
