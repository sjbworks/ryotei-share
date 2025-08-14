import { useMutation } from '@apollo/client'
import { MUTATION_ADD_TRIP, MUTATION_UPDATE_TRIP, MUTATION_DELETE_TRIP } from '@/feature/ryotei/graphql'
import {
  InsertIntotripsCollectionMutation as AddTripMutation,
  InsertIntotripsCollectionMutationVariables as AddTripMutationVariables,
  UpdatetripsCollectionMutation as UpdateTripMutation,
  UpdatetripsCollectionMutationVariables as UpdateTripMutationVariables,
  DeleteFromtripsCollectionMutation as DeleteTripMutation,
  DeleteFromtripsCollectionMutationVariables as DeleteTripMutationVariables,
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

  const createTrip = async (tripData: TripsInsertInput) => {
    await addTrip({
      variables: { objects: { name: tripData?.name } },
    })
    await refetchTrip?.()
  }

  const updateTrip = async (tripData: TripsUpdateInput) => {
    await updateTrips({
      variables: { set: { name: tripData?.name }, filter: { id: tripData.id } },
    })
    await refetchTrip?.()
  }

  const deleteTrip = async (tripData: TripsFilter) => {
    await deleteTrips({
      variables: { filter: { id: tripData.id } },
    })
    await refetchTrip?.()
  }

  return {
    createTrip,
    updateTrip,
    deleteTrip,
  }
}
