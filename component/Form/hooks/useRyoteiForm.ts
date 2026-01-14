import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { RyoteiInsertInput } from '@/feature/api/graphql'

const STORAGE_KEY = 'ryotei_form_last_values'

interface StoredFormValues {
  datetime: string
  description: string
}

const getStoredValues = (): StoredFormValues | null => {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const saveFormValues = (datetime: Date, description: string) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        datetime: datetime.toISOString(),
        description,
      })
    )
  } catch {
    // Ignore storage errors
  }
}

export const useRyoteiForm = (data?: RyoteiInsertInput | null) => {
  const initialValues = useMemo(() => {
    // If editing existing data, use that data
    if (data?.datetime) {
      return {
        datetime: new Date(data.datetime),
        description: data?.description || '',
      }
    }

    // If adding new ryotei, try to load previous values
    const stored = getStoredValues()
    if (stored) {
      return {
        datetime: new Date(stored.datetime),
        description: stored.description,
      }
    }

    // Default to current datetime
    return {
      datetime: new Date(),
      description: '',
    }
  }, [data?.datetime, data?.description])

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
