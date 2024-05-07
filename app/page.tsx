import { cookies } from 'next/headers'
import { TimelineView } from '@/feature/ryotei/components/TimelineView'
import { getRyotei } from '@/feature/ryotei/api'
import { logout } from '@/feature/auth/api'
import { Layout } from '@/component'

export default async function Home() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const res = await getRyotei(cookies().toString())

  return (
    <main className={containerStyle}>
      <Layout logout={logout}>
        <TimelineView data={res} />
      </Layout>
    </main>
  )
}
