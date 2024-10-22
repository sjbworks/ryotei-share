import { TimelineView } from '@/feature/ryotei/components/TimelineView'
import { Layout } from '@/component'

export default async function Home() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'

  return (
    <main className={containerStyle}>
      <Layout>
        <TimelineView />
      </Layout>
    </main>
  )
}
