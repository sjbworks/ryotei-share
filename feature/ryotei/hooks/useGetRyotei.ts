'use client'
import { Plan } from '@/component'
import { QUERY_GET_RYOTEI } from '@/feature/ryotei/graphql'
import { GetRyoteiQuery, GetRyoteiQueryVariables, OrderByDirection } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { TZDate } from '@date-fns/tz'
import { ja } from 'date-fns/locale/ja'

export const useGetRyotei = () => {
  const variables: GetRyoteiQueryVariables = {
    orderBy: [{ datetime: OrderByDirection.AscNullsLast }],
  }
  const { data, refetch } = useQuery<GetRyoteiQuery, GetRyoteiQueryVariables>(QUERY_GET_RYOTEI, {
    variables,
  })

  const res = data?.ryoteiCollection?.edges?.map((edge) => edge.node)
  const grouped: Record<string, Plan[]> | undefined = res?.reduce(
    (acc: Record<string, Plan[]>, { id, datetime, description }: Plan) => {
      const rowTZDate = new TZDate(datetime + 'Z')
      const formatDate = format(rowTZDate, 'yyyy-MM-dd', { locale: ja })
      const formatRowDate = format(rowTZDate, "yyyy-MM-dd'T'HH:mm:ss.SS", { locale: ja })
      if (!acc[formatDate]) {
        acc[formatDate] = []
      }
      acc[formatDate].push({ datetime: formatRowDate, description, id })
      acc[formatDate].sort((a, b) => a.datetime.localeCompare(b.datetime))
      return acc
    },
    {}
  )
  return {
    data: grouped
      ? Object.keys(grouped)
          .sort()
          .reduce((acc: Record<string, Plan[]>, key: string) => {
            acc[key] = grouped[key]
            return acc
          }, {})
      : undefined,
    refetch,
  }
}
