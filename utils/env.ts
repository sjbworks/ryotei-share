// https://zenn.dev/yun_bow/books/bbd75c256479b0/viewer/656295

import 'server-only'
import { z } from 'zod'
import { envPublic } from '@/utils/env-public'

// Server-only vars. NEXT_PUBLIC_* live in env-public.ts and are merged in below.
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SCHEMA_URL: z.url({ message: 'SCHEMA_URL must be a valid URL' }),
  // E2E-only: read by Playwright (e2e/), never by the running app. Keep optional so
  // the app doesn't fail to boot in environments (e.g. production) without them.
  E2E_TEST_EMAIL: z.email({ message: 'E2E_TEST_EMAIL must be a valid email address' }).optional(),
  E2E_TEST_PASSWORD: z.string().min(6, 'E2E_TEST_PASSWORD must be at least 6 characters').optional(),
})

const parsed = EnvSchema.safeParse(process.env)
if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(z.flattenError(parsed.error).fieldErrors, null, 2)}`
  )
}
export const env = { ...envPublic, ...parsed.data }
