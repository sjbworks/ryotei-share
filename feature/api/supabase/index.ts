import { createClient } from '@supabase/supabase-js'
import { gql } from '@apollo/client'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/constants/supabase'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export { default as QUERY_GET_RYOTEI } from './getRyotei.gql'
