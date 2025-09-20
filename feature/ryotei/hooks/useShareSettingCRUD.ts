import { useMutation } from '@apollo/client'
import { MUTATION_ADD_SHARE_SETTING, MUTATION_UPDATE_SHARE_SETTING } from '@/feature/ryotei/graphql'
import {
  InsertIntoshareCollectionMutation as AddShareMutation,
  InsertIntoshareCollectionMutationVariables as AddShareMutationVariables,
  UpdateshareCollectionMutation as UpdateshareMutation,
  UpdateshareCollectionMutationVariables as UpdateshareMutationVariables,
  ShareInsertInput,
  ShareUpdateInput,
} from '@/feature/api/graphql'
import { SnackbarDispatchContext } from '@/feature/provider/SnackbarContextProvider'
import { useContext } from 'react'

export const useShareSettingCRUD = () => {
  const dispatch = useContext(SnackbarDispatchContext)
  const [addShareSetting] = useMutation<AddShareMutation, AddShareMutationVariables>(MUTATION_ADD_SHARE_SETTING)
  const [updatePublicSetting] = useMutation<UpdateshareMutation, UpdateshareMutationVariables>(
    MUTATION_UPDATE_SHARE_SETTING
  )

  const shareTrip = async (newData: ShareInsertInput) => {
    try {
      const insertData: ShareInsertInput = {
        ...newData,
        trip_id: newData.trip_id,
      }
      const result = await addShareSetting({ variables: { objects: insertData } })
      const shareId = result.data?.insertIntoshareCollection?.records[0].share_id
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

  const publish = async (tripId: string, publish: boolean) => {
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

  return {
    shareTrip,
    publish,
  }
}
