import { useForm } from 'react-hook-form'
import { RyoteiInsertInput } from '@/feature/api/graphql'

export const useRyoteiForm = (data?: RyoteiInsertInput | null) => {
  const datetime = data?.datetime ? new Date(data.datetime) : new Date()

  return useForm<RyoteiInsertInput>({
    reValidateMode: 'onBlur',
    defaultValues: {
      datetime,
      description: data?.description,
      id: data?.id,
      user_id: data?.user_id,
    },
  })
}
