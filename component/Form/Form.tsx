import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import { Button } from '@/component/Button'

type FormInput = {
  datetime: Date
  description: string
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInput>({ reValidateMode: 'onBlur', defaultValues: undefined })
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)
  return (
    <div className="grid gap-4">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="datetime"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <DateTimePicker {...field} className="block w-full" />}
        />
      </LocalizationProvider>
      <TextField
        {...register('description', { required: true })}
        error={!!errors.description}
        helperText={errors.description && 'Description is required'}
        className="block w-full"
      />
      <Button onClick={handleSubmit(onSubmit)} className="block w-full">
        送信
      </Button>
    </div>
  )
}
