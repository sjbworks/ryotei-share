import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@/component/Button'

type FormInput = {
  datetime: Date
  description: string
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({ reValidateMode: 'onBlur', defaultValues: undefined })
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      className="flex flex-col"
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
        送信
      </Button>
    </Box>
  )
}
