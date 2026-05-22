import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export function createServerApolloClient(accessToken?: string) {
  const apiKey = process.env.SUPABASE_ANON_KEY!
  const token = accessToken || apiKey
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.SCHEMA_URL!,
      headers: {
        apiKey,
        authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  })
}
