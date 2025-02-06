import { useState } from "react";
import { QUERY_GET_TRIPS } from '@/feature/ryotei/graphql'
import { GetTripsQuery, GetTripsQueryVariables, OrderByDirection } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client'

export const useRyoteiList = () => {
    const [sideOpen, setSideOpen] = useState(false)
    const handleMenuClick = () => setSideOpen(!sideOpen)
    const onSideClose = () => setSideOpen(false)
    const onSideOpen = () => setSideOpen(true)

    const variables: GetTripsQueryVariables = {
        orderBy: [{ created_at: OrderByDirection.AscNullsLast }],
    }
    const { data, refetch } = useQuery<GetTripsQuery, GetTripsQueryVariables>(QUERY_GET_TRIPS, {
        variables,
    })
    const trips = data?.tripsCollection?.edges?.map(({ node: { id, name } }) => ({ id, name }))

    const [selectedTripId, setSelectedTripId] = useState(trips?.[0].id)
    const onChangeTripId = (tripId: string) => setSelectedTripId(tripId)
    const title = trips?.filter(({ id }) => id === selectedTripId)[0].name || ''

    return { sideOpen, handleMenuClick, onSideClose, onSideOpen, trips, title, onChangeTripId }
}