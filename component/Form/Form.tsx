'use client'
import { useForm, Controller, SubmitHandler, set } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@/component/Button'
import clsx from 'clsx'
import { RyoteiInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'

type Props = {
  className?: string
  onSubmit?: (data: RyoteiInsertInput) => void
  data?: RyoteiInsertInput | null
  onClose?: () => void
  action?: {
    label: string
    onClick: (data: RyoteiInsertInput) => void
  }
  mode?: ActionType | null
}

export const Form = ({ className, onSubmit, data, onClose, action, mode }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RyoteiInsertInput>({ reValidateMode: 'onBlur', defaultValues: undefined })
  const handleClick: SubmitHandler<RyoteiInsertInput> = async (data) => {
    onSubmit && (await onSubmit(data))
    await action?.onClick(data)
  }
  const classProps = clsx('flex flex-col justify-between p-5', className)
  return (
    <div className={classProps}>
      {mode === 'delete' ? (
        '削除しますか？'
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              rules={{ required: true }}
              {...register('datetime', { required: true })}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  value={data?.datetime}
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
            value={data?.description}
            className="block w-full"
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
