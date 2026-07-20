import { z } from 'zod'

const PublicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_PROJECT_ID: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_PROJECT_ID is required'),
  NEXT_PUBLIC_SUPABASE_URL: z.url({ message: 'NEXT_PUBLIC_SUPABASE_URL must be a valid URL' }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
  NEXT_PUBLIC_SCHEMA_URL: z.url({ message: 'NEXT_PUBLIC_SCHEMA_URL must be a valid URL' }),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1, 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is required'),
})

// No `server-only` import: these are safe on the client.
// Next.js only inlines NEXT_PUBLIC_* vars when they are referenced as the literal
// `process.env.NEXT_PUBLIC_FOO`. Passing `process.env` wholesale would leave them
// undefined in the browser bundle, so each var is listed explicitly here.
const parsed = PublicEnvSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_PROJECT_ID: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SCHEMA_URL: process.env.NEXT_PUBLIC_SCHEMA_URL,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})

if (!parsed.success) {
  throw new Error(
    `Invalid public environment variables:\n${JSON.stringify(z.flattenError(parsed.error).fieldErrors, null, 2)}`
  )
}

export const envPublic = parsed.data
