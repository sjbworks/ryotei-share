import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { RyoteiInsertInput } from '@/feature/api/graphql'
import { ja } from 'date-fns/locale/ja'

export const CreateUpdateContent = ({
  control,
  errors,
  register,
}: {
  control: Control<RyoteiInsertInput, unknown>
  errors: FieldErrors<RyoteiInsertInput>
  register: UseFormRegister<RyoteiInsertInput>
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { mb: 2 },
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ fontWeight: 600, fontSize: '1.05rem' }}>予定を入力</Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <Controller
          control={control}
          name="datetime"
          rules={{ required: true }}
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
        multiline
      />
    </Box>
  )
}
