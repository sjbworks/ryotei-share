import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { RyoteiInsertInput } from '@/feature/api/graphql'

export const useRyoteiForm = (data?: RyoteiInsertInput | null) => {
  const datetime = data?.datetime ? new Date(data.datetime) : new Date()

  const form = useForm<RyoteiInsertInput>({
    reValidateMode: 'onBlur',
    defaultValues: {
      datetime,
      description: data?.description,
      id: data?.id,
      user_id: data?.user_id,
      trip_id: data?.trip_id,
    },
  })

  useEffect(() => {
    const newDatetime = data?.datetime ? new Date(data.datetime) : new Date()
    form.reset({
      datetime: newDatetime,
      description: data?.description,
      id: data?.id,
      user_id: data?.user_id,
      trip_id: data?.trip_id,
    })
  }, [data, form])

  return form
}
