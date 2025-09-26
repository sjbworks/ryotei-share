import { createClientForServer } from '@/utils/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    const supabase = await createClientForServer()

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = user.id

    // Delete user's data from ryotei table first (due to foreign key constraints)
    const { error: ryoteiError } = await supabase.from('ryotei').delete().eq('user_id', userId)

    if (ryoteiError) {
      console.error('Error deleting ryotei:', ryoteiError)
      return NextResponse.json({ error: 'Failed to delete ryotei data' }, { status: 500 })
    }

    // Delete user's data from trips table
    const { error: tripsError } = await supabase.from('trips').delete().eq('user_id', userId)

    if (tripsError) {
      console.error('Error deleting trips:', tripsError)
      return NextResponse.json({ error: 'Failed to delete trips data' }, { status: 500 })
    }

    // Create admin client with Service Role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Delete the user account from Supabase Auth
    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (deleteUserError) {
      console.error('Error deleting user account:', deleteUserError)
      return NextResponse.json({ error: 'Failed to delete user account' }, { status: 500 })
    }

    return NextResponse.json({ message: 'User account and all associated data deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
