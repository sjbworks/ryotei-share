'use client'

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider as Provider } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
  // Edge Runtime対応のため、シンプルな設定に変更
  fetch: typeof window !== 'undefined' ? window.fetch : undefined,
})

const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') {
    return { headers }
  }

  try {
    const key = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!}-auth-token`
    // document.cookieを直接使用（Edge Runtime対応）
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

// Apollo Clientの作成（シンプル化）
const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: false, // SSRを無効化
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

// シンプルなプロバイダー
export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <Provider client={client}>{children}</Provider>
}
