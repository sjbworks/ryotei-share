import { Timeline, NoData, Text } from '@/component'
import NoResult from '@/assets/image/no-results.png'
import World from '@/assets/image/world.png'
import Image from 'next/image'
import { getAllPublicShares, getRyoteiByTripId, getTripByShareId } from '@/feature/ryotei/queries'

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
  const tripData = await getTripByShareId(shareId)
  const tripId = tripData?.trip_id
  const tripName = tripData?.trips?.name || '旅程'

  if (!tripId || !tripData?.is_public) {
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

  const ryoteiList = await getRyoteiByTripId(tripId)
  if (!ryoteiList || Object.keys(ryoteiList).length === 0) {
    return <NoData />
  }

  return (
    <div className="flex flex-col gap-4 relative max-w-2xl mx-auto w-full py-8 px-6">
      <div className="flex items-center gap-2 pt-4">
        <Image src={World} alt="World Image" width={48} height={48} />
        <Text variant="h5" fontWeight="700">
          {tripName}
        </Text>
      </div>
      {Object.entries(ryoteiList).map(([key, item]) => (
        <Timeline key={key} title={key} items={item} readOnly={true} className="mb-3" />
      ))}
    </div>
  )
}
