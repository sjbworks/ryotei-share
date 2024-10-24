'use client'

import { HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloNextAppProvider, InMemoryCache, ApolloClient } from '@apollo/experimental-nextjs-app-support'
import { getAccessTokenFromCookie } from '@/utils'

const httpLink = new HttpLink({
  // See more information about this GraphQL endpoint at https://studio.apollographql.com/public/spacex-l4uc6p/variant/main/home
  uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
  // you can configure the Next.js fetch cache here if you want to
  fetchOptions: { cache: 'force-cache' },
})

const authLink = setContext((_, { headers }) => {
  const key = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!}-auth-token`
  const token = getAccessTokenFromCookie(key)
  if (!token) window.location.replace('/login')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  }
})

// const resetToken = onError(({ response, graphQLErrors, networkError }) => {
//   console.log('response', response)
//   console.log('graphQLErrors', graphQLErrors)
//   console.log('networkError', networkError)
//   // if (networkError && graphQLErrors?.[0].extensions?.code === 401) {
//   // logout()
//   // remove cached token on 401 from the server
//   // store.dispatch(actions.signOut())
//   // networkError = undefined
//   // }
// })

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   console.log('errorLink', graphQLErrors)
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//     )
//   if (networkError) console.log(`[Network error]: ${networkError}`)
// })

const makeClient = () =>
  new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  })

// you need to create a component to wrap your app in
export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
