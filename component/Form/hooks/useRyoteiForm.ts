import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { RyoteiInsertInput } from '@/feature/api/graphql'

export const useRyoteiForm = (data?: RyoteiInsertInput | null, lastDatetime?: string | Date | null) => {
  const initialValues = useMemo(() => {
    // If editing existing data, use that data
    if (data?.datetime) {
      return {
        datetime: new Date(data.datetime),
        description: data?.description || '',
      }
    }

    // When adding a new ryotei, default the datetime to the last entry's
    // datetime (if any) and keep the description blank.
    return {
      datetime: lastDatetime ? new Date(lastDatetime) : new Date(),
      description: '',
    }
  }, [data, lastDatetime])

  const form = useForm<RyoteiInsertInput>({
    reValidateMode: 'onBlur',
    defaultValues: {
      datetime: initialValues.datetime,
      description: initialValues.description,
      id: data?.id || undefined,
      user_id: data?.user_id || undefined,
      trip_id: data?.trip_id || undefined,
    },
  })

  useEffect(() => {
    form.reset({
      datetime: initialValues.datetime,
      description: initialValues.description,
      id: data?.id || undefined,
      user_id: data?.user_id || undefined,
      trip_id: data?.trip_id || undefined,
    })
  }, [data, form, initialValues])

  return form
}
