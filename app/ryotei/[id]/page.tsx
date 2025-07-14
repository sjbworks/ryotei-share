import { MainView } from '@/feature/ryotei/components/MainView'
import { Layout } from '@/component'
import { useRouter } from 'next/router'

export default async function Ryotei() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'

  return (
    <main className={containerStyle}>
      <Layout>
        <MainView />
      </Layout>
    </main>
  )
}
