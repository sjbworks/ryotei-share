import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { MUTATION_ADD_SHARE_SETTING } from '@/feature/ryotei/graphql'
import {
  InsertIntoshare_SettingCollectionMutation as AddShareSettingMutation,
  InsertIntoshare_SettingCollectionMutationVariables as AddShareSettingMutationVariables,
  Share_SettingInsertInput,
} from '@/feature/api/graphql'

export const useShareSettingCRUD = () => {
  const [addShareSetting, { data }] = useMutation<AddShareSettingMutation, AddShareSettingMutationVariables>(
    MUTATION_ADD_SHARE_SETTING
  )

  const shareTrip = async (newData: Share_SettingInsertInput) => {
    try {
      const insertData: Share_SettingInsertInput = {
        ...newData,
        trip_id: newData.trip_id,
      }
      await addShareSetting({ variables: { objects: insertData } })
      const shareId = await data?.insertIntoshare_settingCollection?.records[0].share_id
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
