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

  // > すでにShareにデータが作られている場合
  //   updatePublicSetting
  // > Shareにデータがない場合
  //   addShareSetting
  const shareTrip = async (newData: ShareInsertInput) => {
    try {
      const insertData: ShareInsertInput = {
        ...newData,
        is_public: true,
        trip_id: newData.trip_id,
      }
      const existShareSetting = (await getShareSettingById({ variables: { tripId: newData.trip_id } })).data
        ?.shareCollection?.edges[0].node.trip_id
      let shareId
      if (existShareSetting) {
        const result = await updatePublicSetting({ variables: { objects: insertData } })
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

  const changePublishState = async (tripId: string, publish: boolean = false) => {
    try {
      const updateData: ShareUpdateInput = {
        trip_id: tripId,
        is_public: publish,
      }
      await updatePublicSetting({ variables: { objects: updateData } })
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  // shareのmodal開いた時
  // is_publish = true のデータがある場合はchangePublishState
  // is_publish = true のデータがない場合はshareTrip

  return {
    shareTrip,
    changePublishState,
  }
}
