import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TextField from '@mui/material/TextField'
import { RyoteiInsertInput } from '@/feature/api/graphql'
import { ja } from 'date-fns/locale/ja'
import { Text } from '@/component/Text'
import { PlaceAutocomplete, type PlaceData } from './PlaceAutocomplete'

const datePickerTextFieldSx = {
  width: '100%',
  '& .MuiPickersOutlinedInput-root': {
    backgroundColor: '#f9f6f1',
    borderRadius: '14px',
    minHeight: 48,
  },
  '& .MuiPickersOutlinedInput-notchedOutline': {
    border: '0.5px solid rgba(28,25,23,0.14)',
    borderRadius: '14px',
  },
  '& .MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline': {
    border: '0.5px solid rgba(28,25,23,0.14)',
  },
  '& .MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
    border: '1.5px solid #ff8c42',
  },
  '& .MuiPickersInputBase-sectionContent': {
    fontSize: 14,
    color: '#1c1917',
  },
  '& .MuiPickersInputBase-sectionsContainer': {
    padding: '12px 14px',
  },
  '& .MuiFormHelperText-root': { marginLeft: 0, fontSize: 11 },
}

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

const FieldLabel = ({ children, badge }: { children: string; badge?: 'required' | 'optional' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
    <Text
      component="span"
      sx={{
        display: 'block',
        fontSize: 11,
        fontWeight: 500,
        color: 'var(--ink-3)',
        letterSpacing: '0.06em',
      }}
    >
      {children}
    </Text>
    {badge && (
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          padding: '2px 6px',
          borderRadius: 4,
          letterSpacing: '0.03em',
          background: badge === 'required' ? 'var(--sun-light)' : 'var(--sand)',
          color: badge === 'required' ? 'var(--sun-dark)' : 'var(--ink-3)',
          border: badge === 'optional' ? '0.5px solid rgba(28,25,23,0.14)' : 'none',
        }}
      >
        {badge === 'required' ? '必須' : '任意'}
      </span>
    )}
  </div>
)

export const CreateUpdateContent = ({
  control,
  errors,
  register,
  onPlaceChange,
  place,
}: {
  control: Control<RyoteiInsertInput, unknown>
  errors: FieldErrors<RyoteiInsertInput>
  register: UseFormRegister<RyoteiInsertInput>
  onPlaceChange?: (place: PlaceData | null) => void
  place?: PlaceData | null
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <FieldLabel badge="required">日時</FieldLabel>
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
                    sx: datePickerTextFieldSx,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <div>
        <FieldLabel badge="required">内容</FieldLabel>
        <TextField
          {...register('description', { required: true })}
          error={!!errors.description}
          helperText={errors.description && '内容を入力してください。'}
          placeholder="予定の内容を入力"
          multiline
          minRows={1}
          sx={textFieldSx}
        />
      </div>
      <div style={{ position: 'relative' }}>
        <FieldLabel badge="optional">場所</FieldLabel>
        <PlaceAutocomplete value={place ?? null} onChange={onPlaceChange} placeholder="場所を追加" />
      </div>
    </div>
  )
}
