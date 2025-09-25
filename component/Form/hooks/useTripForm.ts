import { useForm } from 'react-hook-form'
import { TripsInsertInput } from '@/feature/api/graphql'
import { useEffect } from 'react'

export const useTripForm = (data?: TripsInsertInput | null) => {
  const form = useForm<TripsInsertInput>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: data?.name || '',
      user_id: data?.user_id,
    },
  })

  // データが変わった時にフォームをリセット
  useEffect(() => {
    form.reset({
      name: data?.name || '',
      user_id: data?.user_id,
    })
  }, [data, form])

  return form
}
