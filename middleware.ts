import { updateSession } from '@/utils/supabase/middleware'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // update user's auth session
  return await updateSession(req)
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth|login|legal|api).*)',
  ],
}
