import { useMutation } from '@apollo/client'
import { MUTATION_ADD_TRIP } from '@/feature/ryotei/graphql'
import {
  InsertIntotripsCollectionMutation as AddTripMutation,
  InsertIntotripsCollectionMutationVariables as AddTripMutationVariables,
  TripsInsertInput,
} from '@/feature/api/graphql'

export const useTripCRUD = (
  refetchTrip?: () => void,
  onChangeTripId?: (id: string) => void
) => {
  const [addTrip] = useMutation<AddTripMutation, AddTripMutationVariables>(MUTATION_ADD_TRIP, {
    onCompleted: (data) => onChangeTripId?.(data.insertIntotripsCollection?.records[0].id),
  })

  const createTrip = async (tripData: TripsInsertInput) => {
    await addTrip({ 
      variables: { objects: { name: tripData?.name } } 
    })
    await refetchTrip?.()
  }

  return {
    createTrip,
  }
}