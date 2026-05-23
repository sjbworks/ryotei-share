import { createServerApolloClient } from '@/feature/ryotei/lib'
import { QUERY_GET_TRIPS } from '@/feature/ryotei/graphql'
import { GetTripsQuery, GetTripsQueryVariables, OrderByDirection } from '@/feature/api/graphql'

export async function getTripsWithAuth(accessToken: string) {
  const client = createServerApolloClient(accessToken)
  const { data } = await client.query<GetTripsQuery, GetTripsQueryVariables>({
    query: QUERY_GET_TRIPS,
    variables: {
      orderBy: [{ created_at: OrderByDirection.AscNullsLast }],
    },
  })
  return data
}
