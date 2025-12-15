import { MainView } from '@/feature/ryotei/components/MainView'
import { createClientForServer } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { QUERY_GET_TRIPS, QUERY_GET_RYOTEI } from '@/feature/ryotei/graphql'
import {
  GetTripsQuery,
  GetTripsQueryVariables,
  GetRyoteiQuery,
  GetRyoteiQueryVariables,
  OrderByDirection,
} from '@/feature/api/graphql'

async function createServerApolloClient(accessToken: string) {
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
      headers: {
        apiKey,
        authorization: `Bearer ${accessToken}`,
      },
      fetchOptions: { cache: 'no-store' },
    }),
    cache: new InMemoryCache(),
  })
}

export default async function Home() {
  const supabase = await createClientForServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const session = await supabase.auth.getSession()
  const accessToken = session.data.session?.access_token

  if (!accessToken) {
    redirect('/login')
  }

  const client = await createServerApolloClient(accessToken)

  const { data: tripsData } = await client.query<GetTripsQuery, GetTripsQueryVariables>({
    query: QUERY_GET_TRIPS,
    variables: {
      orderBy: [{ created_at: OrderByDirection.AscNullsLast }],
    },
  })

  const trips = tripsData?.tripsCollection?.edges || []
  const selectedTripId = trips.length > 0 ? trips[0].node.id : undefined

  let ryoteiData = null
  if (selectedTripId) {
    const { data } = await client.query<GetRyoteiQuery, GetRyoteiQueryVariables>({
      query: QUERY_GET_RYOTEI,
      variables: {
        orderBy: [{ datetime: OrderByDirection.AscNullsLast }],
        filter: { trip_id: { eq: selectedTripId } },
      },
    })
    ryoteiData = data
  }

  return <MainView initialTripsData={tripsData} initialRyoteiData={ryoteiData} initialSelectedTripId={selectedTripId} />
}
