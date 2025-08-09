'use client'

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider as Provider } from '@apollo/client'
import { useMemo } from 'react'

// シンプルなHTTPリンク
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
})

export function ApolloProvider({ children }: React.PropsWithChildren) {
  const client = useMemo(() => {
    // 認証リンク（クライアントサイドでのみ作成）
    const authLink = setContext((_, { headers }) => {
      try {
        const key = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!}-auth-token`
        const cookies = document.cookie.split(';')
        const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith(key))
        const token = tokenCookie ? tokenCookie.split('=')[1] : null

        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
        }
      } catch (error) {
        console.warn('Auth link error:', error)
        return {
          headers: {
            ...headers,
            apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
        }
      }
    })

    return new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
        },
      },
    })
  }, [])

  return <Provider client={client}>{children}</Provider>
}
