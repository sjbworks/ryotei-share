import { useForm, Controller } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()
  return (
    <div>
      <Controller
        name="datetime"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <DateTimePicker {...field} />}
      ></Controller>
    </div>
  )
}
