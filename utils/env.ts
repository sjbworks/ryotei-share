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
})

const parsed = EnvSchema.safeParse(process.env)
if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(z.flattenError(parsed.error).fieldErrors, null, 2)}`
  )
}
export const env = { ...envPublic, ...parsed.data }
