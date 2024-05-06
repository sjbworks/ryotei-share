import { cookies } from 'next/headers'
import { TimelineView } from '@/feature/ryotei/components/TimelineView'
import { getRyotei } from '@/feature/ryotei/api/getRyotei'

export default async function Home() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const res = await getRyotei(cookies().toString())
  console.log(res)

  return (
    <main className={containerStyle}>
      <TimelineView data={res} />
    </main>
  )
}
