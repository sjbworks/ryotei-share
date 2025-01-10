'use client'
import { Controller, SubmitHandler } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@/component/Button'
import clsx from 'clsx'
import { RyoteiInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'
import { ja } from 'date-fns/locale/ja'
import { useRyoteiForm } from './hooks'

type Props = {
  className?: string
  onSubmit?: (data: RyoteiInsertInput) => void
  data?: RyoteiInsertInput | null
  onClose?: () => void
  action?: {
    label: string
  }
  mode?: ActionType | null
}

export const Form = ({ className, onSubmit, data, onClose, action, mode }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useRyoteiForm(data)

  const handleClick: SubmitHandler<RyoteiInsertInput> = async (data) => {
    onSubmit && (await onSubmit(data))
  }

  const classProps = clsx('flex flex-col justify-between p-5 box-border', className)

  return (
    <div className={classProps}>
      {mode === 'delete' ? (
        <Box sx={{ paddingY: '16px' }}>この予定を削除しますか？</Box>
      ) : (
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
      )}
      <div className="flex justify-between">
        <Button onClick={() => onClose?.()} className="block w-full">
          キャンセル
        </Button>
        <Button onClick={handleSubmit(handleClick)} className="block w-full" variant="contained">
          {action?.label || '登録'}
        </Button>
      </div>
    </div>
  )
}
