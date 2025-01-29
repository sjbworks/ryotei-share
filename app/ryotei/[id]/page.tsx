import { MainView } from '@/feature/ryotei/components/MainView'
import { Layout } from '@/component'
import { useRouter } from 'next/router'

export default async function Ryotei() {
  const { query } = useRouter()
  const id = Array.isArray(query.id) ? query.id[0] : query.id || ''
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'

  return (
    <main className={containerStyle}>
      <Layout>
        <MainView id={id} title={'title'} />
      </Layout>
    </main>
  )
}
