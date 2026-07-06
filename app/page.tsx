import { MainView } from '@/feature/ryotei/components/MainView'
import { createClientForServer } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getRyoteiByTripIdWithAuth, getTripsWithAuth } from '@/feature/ryotei/queries'
import { Suspense } from 'react'
import { Loading } from '@/component/Loading/Loading'

export default async function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  )
}

async function HomeContent() {
  const supabase = await createClientForServer()
  const session = await supabase.auth.getSession()
  const accessToken = session.data.session?.access_token
  if (!accessToken) {
    redirect('/login')
  }
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const tripsData = await getTripsWithAuth(accessToken)
  const selectedTripId = tripsData?.tripsCollection?.edges?.[0]?.node.id
  const ryoteiData = selectedTripId ? await getRyoteiByTripIdWithAuth(selectedTripId, accessToken) : null

  return (
    <MainView
      initialTripsData={tripsData}
      initialRyoteiData={ryoteiData}
      initialSelectedTripId={selectedTripId}
      user={{
        email: user?.email ?? null,
        name: user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? null,
      }}
    />
  )
}
