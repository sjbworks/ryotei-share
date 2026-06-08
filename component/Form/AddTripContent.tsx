import { type FieldErrors, type UseFormRegister } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { TripsInsertInput } from '@/feature/api/graphql'
import { Text } from '@/component/Text'

const textFieldSx = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f9f6f1',
    borderRadius: '14px',
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: '0.5px solid rgba(28,25,23,0.14)',
    borderRadius: '14px',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '0.5px solid rgba(28,25,23,0.14)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1.5px solid #ff8c42',
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontSize: 14,
    color: '#1c1917',
  },
  '& .MuiFormHelperText-root': { marginLeft: 0, fontSize: 11 },
}

export const AddTripContent = ({
  register,
  errors,
}: {
  errors: FieldErrors<TripsInsertInput>
  register: UseFormRegister<TripsInsertInput>
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Text
          component="span"
          sx={{
            display: 'block',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--ink-3)',
            letterSpacing: '0.06em',
            mb: '6px',
          }}
        >
          旅程名
        </Text>
        <TextField
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && '内容を入力してください。'}
          placeholder="旅程名を入力"
          sx={textFieldSx}
        />
      </div>
    </div>
  )
}
