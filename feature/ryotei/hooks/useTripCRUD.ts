import { useMutation } from '@apollo/client'
import {
  MUTATION_ADD_TRIP,
  MUTATION_UPDATE_TRIP,
  MUTATION_DELETE_TRIP,
  MUTATION_DELETE_RYOTEI_BY_TRIP_ID,
} from '@/feature/ryotei/graphql'
import {
  InsertIntotripsCollectionMutation as AddTripMutation,
  InsertIntotripsCollectionMutationVariables as AddTripMutationVariables,
  UpdatetripsCollectionMutation as UpdateTripMutation,
  UpdatetripsCollectionMutationVariables as UpdateTripMutationVariables,
  DeleteFromtripsCollectionMutation as DeleteTripMutation,
  DeleteFromtripsCollectionMutationVariables as DeleteTripMutationVariables,
  DeleteFromryoteiCollectionByTripIdMutation as DeleteRyoteiByTripIdMutation,
  DeleteFromryoteiCollectionByTripIdMutationVariables as DeleteRyoteiByTripIdMutationVariables,
  TripsInsertInput,
  TripsUpdateInput,
  TripsFilter,
} from '@/feature/api/graphql'

export const useTripCRUD = (refetchTrip?: () => void, onChangeTripId?: (id: string) => void) => {
  const [addTrip] = useMutation<AddTripMutation, AddTripMutationVariables>(MUTATION_ADD_TRIP, {
    onCompleted: (data) => onChangeTripId?.(data.insertIntotripsCollection?.records[0].id),
  })
  const [updateTrips] = useMutation<UpdateTripMutation, UpdateTripMutationVariables>(MUTATION_UPDATE_TRIP, {
    onCompleted: (data) => onChangeTripId?.(data.updatetripsCollection?.records[0].id),
  })
  const [deleteTrips] = useMutation<DeleteTripMutation, DeleteTripMutationVariables>(MUTATION_DELETE_TRIP, {
    onCompleted: (data) => onChangeTripId?.(data.deleteFromtripsCollection?.records[0].id),
  })
  const [deleteRyoteiByTripId] = useMutation<DeleteRyoteiByTripIdMutation, DeleteRyoteiByTripIdMutationVariables>(
    MUTATION_DELETE_RYOTEI_BY_TRIP_ID
  )

  const createTrip = async (tripData: TripsInsertInput) => {
    await addTrip({
      variables: { objects: { name: tripData?.name } },
    })
    await refetchTrip?.()
  }

  const updateTrip = async (tripData: TripsUpdateInput) => {
    console.log('useTripCRUD updateTrip called with:', tripData)
    console.log('tripData.id type:', typeof tripData.id)
    console.log('tripData.id value:', tripData.id)
    console.log('tripData.id JSON:', JSON.stringify(tripData.id))

    try {
      const variables = { set: { name: tripData?.name }, filter: { id: { eq: tripData.id } } }
      console.log('Mutation variables:', variables)

      const result = await updateTrips({
        variables,
      })
      console.log('updateTrips mutation result:', result)
      await refetchTrip?.()
      console.log('refetchTrip completed')
    } catch (error) {
      console.error('updateTrip error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
    }
  }

  const deleteTrip = async (tripData: TripsFilter) => {
    console.log('useTripCRUD deleteTrip called with:', tripData)
    try {
      // 1. 最初に関連するryoteiを削除する
      console.log('Deleting related ryotei first...')
      const deleteRyoteiResult = await deleteRyoteiByTripId({
        variables: {
          filter: { trip_id: { eq: tripData.id } },
          atMost: 100, // 一つの旅程に最大100件の予定があると仮定
        },
      })
      console.log('deleteRyoteiByTripId result:', deleteRyoteiResult)

      // 2. 次にtripを削除する
      console.log('Deleting trip...')
      await deleteTrips({
        variables: { filter: { id: { eq: tripData.id } }, atMost: 1 },
      })

      await refetchTrip?.()
      console.log('Trip and related ryotei deleted successfully')
    } catch (error) {
      console.error('deleteTrip error:', error)
    }
  }

  return {
    createTrip,
    updateTrip,
    deleteTrip,
  }
}
