import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { env } from '@/utils/env'

export function createServerApolloClient(accessToken?: string) {
  const apiKey = env.SUPABASE_ANON_KEY
  const token = accessToken || apiKey
  return new ApolloClient({
    link: new HttpLink({
      uri: env.SCHEMA_URL,
      headers: {
        apiKey,
        authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  })
}
