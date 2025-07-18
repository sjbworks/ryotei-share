import { useForm } from 'react-hook-form'
import { TripsInsertInput } from '@/feature/api/graphql'

export const useTripForm = (data?: TripsInsertInput | null) => {
  return useForm<TripsInsertInput>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: data?.name,
      user_id: data?.user_id,
    },
  })
}
