'use client'
import { useForm, Controller, SubmitHandler, set } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@/component/Button'
import clsx from 'clsx'
import { RyoteiInsertInput } from '@/feature/api/graphql'

type Props = {
  className?: string
  setData?: (data: RyoteiInsertInput) => void
}

export const Form = ({ className, setData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RyoteiInsertInput>({ reValidateMode: 'onBlur', defaultValues: undefined })
  const onSubmit: SubmitHandler<RyoteiInsertInput> = (data) => {
    setData && setData(data)
  }
  const classProps = clsx('flex flex-col justify-between p-10', className)
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      className={classProps}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          rules={{ required: true }}
          {...register('datetime', { required: true })}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  error: !!errors.datetime,
                  helperText: errors.datetime && '日時を入力してください。',
                },
              }}
              className="block w-full"
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        {...register('description', { required: true })}
        error={!!errors.description}
        helperText={errors.description && '内容を入力してください。'}
        className="block w-full"
      />
      <Button onClick={handleSubmit(onSubmit)} className="block w-full">
        登録
      </Button>
    </Box>
  )
}
