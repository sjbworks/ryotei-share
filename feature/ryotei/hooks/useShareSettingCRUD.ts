import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { MUTATION_ADD_SHARE_SETTING } from '@/feature/ryotei/graphql'
import {
  InsertIntoshareCollectionMutation as AddShareMutation,
  InsertIntoshareCollectionMutationVariables as AddShareMutationVariables,
  ShareInsertInput,
} from '@/feature/api/graphql'

export const useShareSettingCRUD = () => {
  const [addShareSetting] = useMutation<AddShareMutation, AddShareMutationVariables>(MUTATION_ADD_SHARE_SETTING)

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
      /* Error Handling */
      console.error(e)
    }
  }

  return {
    shareTrip,
  }
}
