import { type FieldErrors, type UseFormRegister } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { TripsInsertInput } from '@/feature/api/graphql'

export const AddTripContent = ({
  register,
  errors,
}: {
  errors: FieldErrors<TripsInsertInput>
  register: UseFormRegister<TripsInsertInput>
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
      <Box sx={{ fontWeight: 600 }}>旅程名を入力</Box>
      <TextField
        {...register('name', { required: true })}
        error={!!errors.name}
        helperText={errors.name && '内容を入力してください。'}
        slotProps={{
          formHelperText: {
            sx: { marginLeft: 0 },
          },
        }}
        className="block w-full"
        multiline
      />
    </Box>
  )
}
