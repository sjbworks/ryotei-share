import { TimelineView } from '@/feature/ryotei/components/TimelineView'
import { logout } from '@/feature/auth/api'
import { Layout } from '@/component'
import { redirect } from 'next/navigation'

export default async function Home() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const handleLogout = async () => {
    logout()
    redirect('/login')
  }

  return (
    <main className={containerStyle}>
      <Layout>
        <TimelineView />
      </Layout>
    </main>
  )
}
