import { useMutation } from '@apollo/client/react'
import { MUTATION_ADD_TRIP, MUTATION_UPDATE_TRIP, MUTATION_DELETE_TRIP } from '@/feature/ryotei/graphql'
import {
  InsertIntotripsCollectionMutation as AddTripMutation,
  InsertIntotripsCollectionMutationVariables as AddTripMutationVariables,
  UpdatetripsCollectionMutation as UpdateTripMutation,
  UpdatetripsCollectionMutationVariables as UpdateTripMutationVariables,
  DeleteTripByIdMutation as DeleteTripMutation,
  DeleteTripByIdMutationVariables as DeleteTripMutationVariables,
  TripsInsertInput,
  TripsUpdateInput,
} from '@/feature/api/graphql'
import { SnackbarDispatchContext } from '@/feature/provider/SnackbarContextProvider'
import { useContext } from 'react'

export const useTripCRUD = (refetchTrip?: () => void, onChangeTripId?: (id: string) => void) => {
  const dispatch = useContext(SnackbarDispatchContext)

  const [addTrip] = useMutation<AddTripMutation, AddTripMutationVariables>(MUTATION_ADD_TRIP)
  const [updateTrips] = useMutation<UpdateTripMutation, UpdateTripMutationVariables>(MUTATION_UPDATE_TRIP)
  const [deleteTrips] = useMutation<DeleteTripMutation, DeleteTripMutationVariables>(MUTATION_DELETE_TRIP)

  const createTrip = async (tripData: TripsInsertInput) => {
    try {
      const result = await addTrip({
        variables: { objects: { name: tripData?.name } },
      })
      await refetchTrip?.()
      const newTripId = result.data?.insertIntotripsCollection?.records[0].id
      if (newTripId) {
        onChangeTripId?.(newTripId)
      }
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  const updateTrip = async (tripData: TripsUpdateInput) => {
    try {
      const variables = { set: { name: tripData?.name }, filter: { id: { eq: tripData.id } } }

      const result = await updateTrips({
        variables,
      })
      await refetchTrip?.()

      // NOTE: Update title after refetchTrip completes to ensure the updated trip is reflected in the trips array
      const updatedTripId = result.data?.updatetripsCollection?.records[0].id
      if (updatedTripId) {
        onChangeTripId?.(updatedTripId)
      }
    } catch (e) {
      console.error('updateTrip error:', e)
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  const deleteTrip = async (tripData: { id: any }) => {
    try {
      const tripId = tripData.id
      // NOTE: ON DELETE CASCADE automatically removes related ryotei and share records
      await deleteTrips({
        variables: { tripId: tripId, atMost: 20 },
      })

      await refetchTrip?.()
    } catch (e) {
      console.error('deleteTrip error:', e)
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  return {
    createTrip,
    updateTrip,
    deleteTrip,
  }
}
