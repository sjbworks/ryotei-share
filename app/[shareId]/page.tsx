import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { QUERY_GET_TRIP_BY_SHARE_ID, QUERY_GET_RYOTEI, QUERY_GET_ALL_PUBLIC_SHARES } from '@/feature/ryotei/graphql'
import {
  GetTripByShareIdQuery,
  GetTripByShareIdQueryVariables,
  GetRyoteiQuery,
  GetRyoteiQueryVariables,
  GetAllPublicSharesQuery,
  OrderByDirection,
} from '@/feature/api/graphql'
import { formatRyoteiData } from '@/feature/ryotei/utils/formatRyoteiData'
import { Timeline, NoData, Text } from '@/component'

export const revalidate = 60

function createServerApolloClient() {
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SCHEMA_URL!,
      headers: {
        apiKey,
        authorization: `Bearer ${apiKey}`,
      },
      fetchOptions: { cache: 'no-store' },
    }),
    cache: new InMemoryCache(),
  })
}

export async function generateStaticParams() {
  const client = createServerApolloClient()

  const { data } = await client.query<GetAllPublicSharesQuery>({
    query: QUERY_GET_ALL_PUBLIC_SHARES,
  })

  const shares = data?.shareCollection?.edges?.map((edge) => edge.node) ?? []

  return shares.map((share) => ({
    shareId: share.share_id,
  }))
}

export default async function Share({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const client = createServerApolloClient()

  const { data: shareData } = await client.query<GetTripByShareIdQuery, GetTripByShareIdQueryVariables>({
    query: QUERY_GET_TRIP_BY_SHARE_ID,
    variables: { shareId },
  })

  const tripNode = shareData?.shareCollection?.edges?.[0]?.node
  const tripId = tripNode?.trip_id

  if (!tripId || !tripNode?.is_public) {
    return <div>Trip not found or not public</div>
  }

  const { data: ryoteiData } = await client.query<GetRyoteiQuery, GetRyoteiQueryVariables>({
    query: QUERY_GET_RYOTEI,
    variables: {
      orderBy: [{ datetime: OrderByDirection.AscNullsLast }],
      filter: { trip_id: { eq: tripId } },
    },
  })

  const trip = tripNode.trips
  const ryoteiList = ryoteiData?.ryoteiCollection?.edges?.map((edge) => edge.node)
  const formattedData = formatRyoteiData(ryoteiList)

  if (!formattedData || Object.keys(formattedData).length === 0) {
    return <NoData />
  }

  return (
    <div className="flex flex-col gap-4 relative max-w-2xl mx-auto w-full p-4">
      <Text variant="h5" fontWeight="700" className="pt-4">
        {trip?.name}
      </Text>
      {Object.entries(formattedData).map(([key, item]) => (
        <Timeline key={key} title={key} items={item} readOnly={true} className="mb-3" />
      ))}
    </div>
  )
}
