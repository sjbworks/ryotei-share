'use client'
import { QUERY_GET_RYOTEI } from '@/feature/ryotei/graphql'
import { GetRyoteiQuery, GetRyoteiQueryVariables, OrderByDirection } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client/react'
import { formatRyoteiData } from '@/feature/ryotei/utils/formatRyoteiData'
import { useMemo } from 'react'

export const useGetRyotei = (selectedTripId?: string) => {
  const variables: GetRyoteiQueryVariables = {
    orderBy: [{ datetime: OrderByDirection.AscNullsLast }],
    filter: selectedTripId ? { trip_id: { eq: selectedTripId } } : undefined,
  }
  const { data, refetch, loading } = useQuery<GetRyoteiQuery, GetRyoteiQueryVariables>(QUERY_GET_RYOTEI, {
    variables,
    fetchPolicy: 'cache-first',
  })

  const nodes = data?.ryoteiCollection?.edges?.map((edge) => edge.node)
  const formattedData = useMemo(() => formatRyoteiData(nodes), [nodes])

  return {
    data: formattedData,
    refetch,
    loading,
  }
}
