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
  const [addTrip] = useMutation<AddTripMutation, AddTripMutationVariables>(MUTATION_ADD_TRIP)
  const [updateTrips] = useMutation<UpdateTripMutation, UpdateTripMutationVariables>(MUTATION_UPDATE_TRIP)
  const [deleteTrips] = useMutation<DeleteTripMutation, DeleteTripMutationVariables>(MUTATION_DELETE_TRIP)
  const [deleteRyoteiByTripId] = useMutation<DeleteRyoteiByTripIdMutation, DeleteRyoteiByTripIdMutationVariables>(
    MUTATION_DELETE_RYOTEI_BY_TRIP_ID
  )

  const createTrip = async (tripData: TripsInsertInput) => {
    const result = await addTrip({
      variables: { objects: { name: tripData?.name } },
    })
    await refetchTrip?.()
    // refetchTrip完了後にonChangeTripIdを呼び出して、新しいtripがtrips配列に含まれた状態でtitleを更新する
    const newTripId = result.data?.insertIntotripsCollection?.records[0].id
    if (newTripId) {
      onChangeTripId?.(newTripId)
    }
  }

  const updateTrip = async (tripData: TripsUpdateInput) => {
    try {
      const variables = { set: { name: tripData?.name }, filter: { id: { eq: tripData.id } } }

      const result = await updateTrips({
        variables,
      })
      await refetchTrip?.()

      // refetchTrip完了後にonChangeTripIdを呼び出して、更新されたtripがtrips配列に反映された状態でtitleを更新する
      const updatedTripId = result.data?.updatetripsCollection?.records[0].id
      if (updatedTripId) {
        onChangeTripId?.(updatedTripId)
      }
    } catch (error) {
      console.error('updateTrip error:', error)
    }
  }

  const deleteTrip = async (tripData: TripsFilter) => {
    try {
      // 1. 最初に関連するryoteiを削除する
      await deleteRyoteiByTripId({
        variables: {
          filter: { trip_id: { eq: tripData.id } },
          atMost: 100, // 一つの旅程に最大100件の予定があると仮定
        },
      })

      // 2. 次にtripを削除する
      await deleteTrips({
        variables: { filter: { id: { eq: tripData.id } }, atMost: 1 },
      })

      await refetchTrip?.()

      // 削除後は最初の利用可能なtripを選択する（useRyoteiListのuseEffectで自動的に処理される）
      // ここでonChangeTripIdを呼び出すとまだ削除されたIDを参照してしまう可能性があるため呼び出さない
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
