import { Plan } from '@/component'
import { QUERY_GET_RYOTEI } from '@/feature/ryotei/graphql'
import { GetRyoteiQuery, GetRyoteiQueryVariables, RyoteiOrderBy, OrderByDirection } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client'
import { format, parseISO } from 'date-fns'

export const useGetRyotei = () => {
  const variables: GetRyoteiQueryVariables = {
    orderBy: [{ datetime: OrderByDirection.DescNullsLast }],
  }
  const { data, refetch } = useQuery<GetRyoteiQuery, GetRyoteiQueryVariables>(QUERY_GET_RYOTEI, {
    variables,
  })

  const res = data?.ryoteiCollection?.edges?.map((edge) => edge.node)
  const grouped: Record<string, Plan[]> | undefined = res?.reduce(
    (acc: Record<string, Plan[]>, { id, datetime, description }: Plan) => {
      const date = format(parseISO(datetime), 'yyyy-MM-dd')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push({ datetime: format(parseISO(datetime), 'HH:mm'), description, id })
      acc[date].sort((a, b) => a.datetime.localeCompare(b.datetime))
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
