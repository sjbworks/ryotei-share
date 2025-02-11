import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/constants/supabase'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export { default as QUERY_GET_RYOTEI } from './getRyotei.gql'
export { default as MUTATION_ADD_RYOTEI } from './addRyotei.gql'
export { default as MUTATION_DELETE_RYOTEI } from './deleteRyotei.gql'
export { default as MUTATION_UPDATE_RYOTEI } from './updateRyotei.gql'
export { default as QUERY_GET_TRIPS } from './getTrips.gql'
