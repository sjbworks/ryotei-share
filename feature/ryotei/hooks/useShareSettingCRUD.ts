import { useMutation, useLazyQuery } from '@apollo/client'
import {
  MUTATION_ADD_SHARE_SETTING,
  MUTATION_UPDATE_SHARE_SETTING,
  QUERY_GET_SHARE_SETTING_BY_ID,
} from '@/feature/ryotei/graphql'
import {
  InsertIntoshareCollectionMutation as AddShareMutation,
  InsertIntoshareCollectionMutationVariables as AddShareMutationVariables,
  UpdateshareCollectionMutation as UpdateshareMutation,
  UpdateshareCollectionMutationVariables as UpdateshareMutationVariables,
  GetShareByTripIdQuery,
  GetShareByTripIdQueryVariables,
  ShareInsertInput,
  ShareUpdateInput,
} from '@/feature/api/graphql'
import { SnackbarDispatchContext } from '@/feature/provider/SnackbarContextProvider'
import { useContext } from 'react'

export const useShareSettingCRUD = () => {
  const dispatch = useContext(SnackbarDispatchContext)
  const [getShareSettingById] = useLazyQuery<GetShareByTripIdQuery, GetShareByTripIdQueryVariables>(
    QUERY_GET_SHARE_SETTING_BY_ID
  )
  const [addShareSetting] = useMutation<AddShareMutation, AddShareMutationVariables>(MUTATION_ADD_SHARE_SETTING)
  const [updatePublicSetting] = useMutation<UpdateshareMutation, UpdateshareMutationVariables>(
    MUTATION_UPDATE_SHARE_SETTING
  )

  const checkExistShareData = async (tripId: string) => {
    try {
      const shareData = (await getShareSettingById({ variables: { tripId }, fetchPolicy: 'network-only' })).data
        ?.shareCollection?.edges[0]?.node
      return shareData
        ? { exists: true, share_id: shareData.share_id, is_public: shareData.is_public }
        : { exists: false, share_id: null, is_public: null }
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
      return { exists: false, share_id: null, is_public: null }
    }
  }

  const shareTrip = async (newData: ShareInsertInput) => {
    try {
      const insertData: ShareInsertInput = {
        ...newData,
        is_public: true,
        trip_id: newData.trip_id,
      }
      const shareDataResult = await checkExistShareData(newData.trip_id)
      let shareId
      if (shareDataResult.exists) {
        const result = await updatePublicSetting({
          variables: { objects: insertData, filter: { trip_id: { eq: insertData.trip_id } } },
        })
        shareId = result.data?.updateshareCollection?.records[0].share_id
      } else {
        const result = await addShareSetting({ variables: { objects: insertData } })
        shareId = result.data?.insertIntoshareCollection?.records[0].share_id
      }
      window.open(`/${shareId}`, '_blank', 'noopener,noreferrer')
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  const changePublishState = async (tripId: string, publish: boolean = false): Promise<boolean> => {
    try {
      const updateData: ShareUpdateInput = {
        is_public: publish,
      }
      const result = await updatePublicSetting({
        variables: {
          objects: updateData,
          filter: { trip_id: { eq: tripId } },
        },
      })
      return (result.data?.updateshareCollection?.affectedCount ?? 0) > 0
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
      return false
    }
  }

  return {
    shareTrip,
    changePublishState,
    checkExistShareData,
  }
}
