'use client'

import { HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloNextAppProvider, InMemoryCache, ApolloClient } from '@apollo/experimental-nextjs-app-support'
import { getAccessTokenFromCookie, refreshAccessToken } from '@/utils'
import { onError, ErrorResponse } from '@apollo/client/link/error'

const httpLink = new HttpLink({
  // See more information about this GraphQL endpoint at https://studio.apollographql.com/public/spacex-l4uc6p/variant/main/home
  uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
  // you can configure the Next.js fetch cache here if you want to
  fetchOptions: { cache: 'force-cache' },
})

const authLink = setContext((_, { headers }) => {
  const key = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!}-auth-token`
  const token = getAccessTokenFromCookie(key)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  }
})

const refreshOrGoToLogin = (operation: ErrorResponse['operation'], forward: ErrorResponse['forward']) => {
  refreshAccessToken()
    .then((newToken) => {
      if (newToken) {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
        }))
        return forward(operation) // 再試行
      }
      window.location.replace('/login') // リフレッシュ失敗
    })
    .catch(() => {
      window.location.replace('/login') // 他のエラーの場合もログイン画面へ
    })
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    return refreshOrGoToLogin(operation, forward)
  }
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        return refreshOrGoToLogin(operation, forward)
      }
    }
  }
})

const makeClient = () =>
  new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  })

// you need to create a component to wrap your app in
export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
