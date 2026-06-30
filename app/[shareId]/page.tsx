import { Timeline, NoData, Text } from '@/component'
import { getAllPublicShares, getRyoteiByTripId, getTripByShareId } from '@/feature/ryotei/queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const shares = await getAllPublicShares()
  return shares.map((share) => ({
    shareId: share.share_id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const tripData = await getTripByShareId(shareId)
  const tripName = tripData?.trips?.name ? `Ryotei Share | ${tripData?.trips?.name}` : 'Ryotei Share'

  return {
    title: tripName,
    description: '旅程を作成するためのWebサービスです。',
  }
}

export default async function Share({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params

  let tripData: Awaited<ReturnType<typeof getTripByShareId>>
  try {
    tripData = await getTripByShareId(shareId)
  } catch {
    notFound()
  }

  const tripId = tripData?.trip_id
  const tripName = tripData?.trips?.name || '旅程'

  if (!tripId || !tripData?.is_public) {
    notFound()
  }

  const ryoteiList = await getRyoteiByTripId(tripId)
  if (!ryoteiList || Object.keys(ryoteiList).length === 0) {
    return <NoData />
  }

  return (
    <div style={{ flex: 1, background: 'var(--sand)', width: '100%' }}>
      <div className="flex flex-col gap-4 relative max-w-2xl mx-auto w-full py-8 px-6">
        <div className="flex items-center gap-2 pt-4">
          <Text variant="h5" fontWeight="700">
            {tripName}
          </Text>
        </div>
        {Object.entries(ryoteiList).map(([key, item]) => (
          <Timeline key={key} title={key} items={item} readOnly={true} className="mb-3" />
        ))}
      </div>
    </div>
  )
}
