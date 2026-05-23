import { createServerApolloClient } from '@/feature/ryotei/lib'
import { QUERY_GET_RYOTEI } from '@/feature/ryotei/graphql'
import { GetRyoteiQuery, GetRyoteiQueryVariables, OrderByDirection } from '@/feature/api/graphql'
import { formatRyoteiData } from '@/feature/ryotei/utils/formatRyoteiData'

export async function getRyoteiByTripIdWithAuth(tripId: string, accessToken: string) {
  const client = createServerApolloClient(accessToken)
  const { data } = await client.query<GetRyoteiQuery, GetRyoteiQueryVariables>({
    query: QUERY_GET_RYOTEI,
    variables: {
      orderBy: [{ datetime: OrderByDirection.AscNullsLast }],
      filter: { trip_id: { eq: tripId } },
    },
  })
  return formatRyoteiData(data?.ryoteiCollection?.edges?.map((edge) => edge.node) ?? [])
}
