import { createServerApolloClient } from '@/feature/ryotei/lib'
import { QUERY_GET_ALL_PUBLIC_SHARES } from '@/feature/ryotei/graphql'
import { GetAllPublicSharesQuery } from '@/feature/api/graphql'

export async function getAllPublicShares() {
  'use cache'

  const client = createServerApolloClient()
  const { data } = await client.query<GetAllPublicSharesQuery>({
    query: QUERY_GET_ALL_PUBLIC_SHARES,
  })
  return data?.shareCollection?.edges?.map((edge) => edge.node) ?? []
}
