import { createServerApolloClient } from '@/feature/ryotei/lib'
import { cacheLife } from 'next/cache'
import { QUERY_GET_RYOTEI } from '@/feature/ryotei/graphql'
import { GetRyoteiQuery, GetRyoteiQueryVariables, OrderByDirection } from '@/feature/api/graphql'
import { formatRyoteiData } from '@/feature/ryotei/utils/formatRyoteiData'

export async function getRyoteiByTripId(tripId: string) {
  'use cache'
  cacheLife('minutes')

  const client = createServerApolloClient()
  const { data } = await client.query<GetRyoteiQuery, GetRyoteiQueryVariables>({
    query: QUERY_GET_RYOTEI,
    variables: {
      orderBy: [{ datetime: OrderByDirection.AscNullsLast }],
      filter: { trip_id: { eq: tripId } },
    },
  })
  return formatRyoteiData(data?.ryoteiCollection?.edges?.map((edge) => edge.node) ?? [])
}
