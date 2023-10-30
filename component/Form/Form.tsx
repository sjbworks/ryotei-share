import { useForm, Controller } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()
  return (
    <div className="flex flex-col">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="datetime"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <DateTimePicker {...field} />}
        />
      </LocalizationProvider>
      <TextField
        {...register('title', { required: true })}
        error={!!errors.title}
        helperText={errors.title && 'Title is required'}
      />
      <input type="submit" />
    </div>
  )
}
