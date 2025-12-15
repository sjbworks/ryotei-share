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
import NoResult from '@/assets/image/no-results.png'
import World from '@/assets/image/world.png'
import Image from 'next/image'

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

export async function generateMetadata({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const client = createServerApolloClient()

  const { data: shareData } = await client.query<GetTripByShareIdQuery, GetTripByShareIdQueryVariables>({
    query: QUERY_GET_TRIP_BY_SHARE_ID,
    variables: { shareId },
  })

  const tripNode = shareData?.shareCollection?.edges?.[0]?.node
  const tripName = tripNode?.trips?.name ? `Ryotei Share | ${tripNode?.trips?.name}` : 'Ryotei Share'

  return {
    title: tripName,
    description: '旅程を作成するためのWebサービスです。',
  }
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
    return (
      <div className="flex flex-col items-center justify-center h-full background">
        <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
          <Text variant="h6">旅程が見つかりませんでした</Text>
          <Text color="grey.600" variant="body1">
            旅程が削除されたか、非公開になっています。
          </Text>
          <Image src={NoResult} alt="No Result Image" width={150} height={150} />
        </div>
      </div>
    )
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
    <div className="flex flex-col gap-4 relative max-w-2xl mx-auto w-full py-8 px-6">
      <div className="flex items-center gap-2 pt-4">
        <Image src={World} alt="World Image" width={48} height={48} />
        <Text variant="h5" fontWeight="700">
          {trip?.name}
        </Text>
      </div>
      {Object.entries(formattedData).map(([key, item]) => (
        <Timeline key={key} title={key} items={item} readOnly={true} className="mb-3" />
      ))}
    </div>
  )
}
