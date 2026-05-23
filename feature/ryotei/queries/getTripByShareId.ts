import { createServerApolloClient } from '@/feature/ryotei/lib'
import { cacheLife } from 'next/cache'
import { QUERY_GET_TRIP_BY_SHARE_ID } from '@/feature/ryotei/graphql'
import { GetTripByShareIdQuery, GetTripByShareIdQueryVariables } from '@/feature/api/graphql'

export async function getTripByShareId(shareId: string) {
  'use cache'
  cacheLife('minutes')

  const client = createServerApolloClient()
  const { data } = await client.query<GetTripByShareIdQuery, GetTripByShareIdQueryVariables>({
    query: QUERY_GET_TRIP_BY_SHARE_ID,
    variables: { shareId },
  })
  return data?.shareCollection?.edges?.[0]?.node
}
