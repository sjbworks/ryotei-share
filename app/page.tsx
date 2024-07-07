import { cookies } from 'next/headers'
import { TimelineView } from '@/feature/ryotei/components/TimelineView'
import { getRyotei } from '@/feature/ryotei/api'
import { logout } from '@/feature/auth/api'
import { Layout } from '@/component'
import { QUERY_GET_RYOTEI } from '@/feature/api/supabase'
import { GetRyoteiQuery, GetRyoteiQueryVariables, RyoteiOrderBy } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client'
import { format, parseISO } from 'date-fns'

export default async function Home() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const res = await getRyotei(cookies().toString())
  // const { data } = useQuery<GetRyoteiQuery, GetRyoteiQueryVariables>(QUERY_GET_RYOTEI, {
  //   variables: { orderBy: ['datetime' as RyoteiOrderBy] },
  // })

  return (
    <main className={containerStyle}>
      <Layout logout={logout}>
        <TimelineView data={res} />
      </Layout>
    </main>
  )
}
