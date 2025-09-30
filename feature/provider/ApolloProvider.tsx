'use client'

import { HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ApolloNextAppProvider, InMemoryCache, ApolloClient } from '@apollo/client-integration-nextjs'
import { getAccessTokenFromCookie, refreshAccessToken } from '@/utils'
import { ErrorLink } from '@apollo/client/link/error'
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors'
import { ApolloLink } from '@apollo/client/link'

const httpLink = new HttpLink({
  // See more information about this GraphQL endpoint at https://studio.apollographql.com/public/spacex-l4uc6p/variant/main/home
  uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
  // you can configure the Next.js fetch cache here if you want to
  fetchOptions: { cache: 'force-cache' },
})

const authLink = new SetContextLink((prevContext, operation) => {
  const key = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!}-auth-token`
  const token = getAccessTokenFromCookie(key)
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  }
})

const refreshOrGoToLogin = (operation: ApolloLink.Operation, forward: ApolloLink.ForwardFunction) => {
  refreshAccessToken().then((newToken) => {
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
  // .catch(() => {
  //   window.location.replace('/login') // 他のエラーの場合もログイン画面へ
  // })
}

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path, extensions }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      if (extensions?.code === 'UNAUTHENTICATED') return refreshOrGoToLogin(operation, forward)
    })
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`)
    )
  } else {
    console.error(`[Network error]: ${error}`)
    if ('statusCode' in error && error.statusCode === 401) return refreshOrGoToLogin(operation, forward)
  }
})

const makeClient = () =>
  new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  })

// you need to create a component to wrap your app in
export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
