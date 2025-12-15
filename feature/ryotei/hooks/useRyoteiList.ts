import { useEffect, useState, useMemo } from 'react'
import { QUERY_GET_TRIPS } from '@/feature/ryotei/graphql'
import { GetTripsQuery, GetTripsQueryVariables, OrderByDirection } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client/react'

export const useRyoteiList = (initialData?: GetTripsQuery | null, initialSelectedTripId?: string) => {
  const [sideOpen, setSideOpen] = useState(false)
  const handleMenuClick = () => {
    setSideOpen(!sideOpen)
  }
  const onSideClose = () => setSideOpen(false)
  const onSideOpen = () => setSideOpen(true)

  const variables: GetTripsQueryVariables = {
    orderBy: [{ created_at: OrderByDirection.AscNullsLast }],
  }

  const {
    data,
    refetch: refetchTrip,
    loading,
  } = useQuery<GetTripsQuery, GetTripsQueryVariables>(QUERY_GET_TRIPS, {
    variables,
    fetchPolicy: 'cache-first',
  })

  const currentData = data || initialData
  const trips =
    currentData?.tripsCollection?.edges?.map(({ node: { id, name } }) => ({ id, name })).filter((trip) => trip.id) || []

  const [selectedTripId, setSelectedTripId] = useState<string | undefined>(initialSelectedTripId)
  const onChangeTripId = (tripId: string) => setSelectedTripId(tripId)
  const title = useMemo(() => trips?.find((trip) => trip.id === selectedTripId)?.name || '', [selectedTripId, trips])

  useEffect(() => {
    if (trips && trips.length > 0) {
      const selectedTripExists = trips.some((trip) => trip.id === selectedTripId)
      if (!selectedTripId || !selectedTripExists) {
        setSelectedTripId(trips[0].id)
      }
    } else {
      setSelectedTripId(undefined)
    }
  }, [trips, selectedTripId])

  return {
    sideOpen,
    handleMenuClick,
    onSideClose,
    onSideOpen,
    trips,
    title,
    onChangeTripId,
    selectedTripId,
    refetchTrip,
    loading: initialData ? false : loading,
  }
}
