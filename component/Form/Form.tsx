'use client'
import { Controller, SubmitHandler, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@/component/Button'
import clsx from 'clsx'
import { RyoteiInsertInput, TripsInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'
import { ja } from 'date-fns/locale/ja'
import { useRyoteiForm, useTripForm } from './hooks'

type Props = {
  className?: string
  onSubmit?: (data: RyoteiInsertInput) => void
  data?: RyoteiInsertInput | TripsInsertInput | null
  onClose?: () => void
  action?: {
    label: string
  }
  mode?: ActionType | null
}

const DeleteContent = () => {
  return <Box sx={{ paddingY: '16px' }}>この予定を削除しますか？</Box>
}

const DeleteTripContent = () => {
  return <Box sx={{ paddingY: '16px' }}>この旅程を削除しますか？</Box>
}

const WithdrawAccountContent = () => {
  return <Box sx={{ paddingY: '16px' }}>退会しますか？</Box>
}

const CreateUpdateContent = ({
  control,
  errors,
  register,
}: {
  control: Control<RyoteiInsertInput, any>
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

const AddTripContent = ({
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
      <TextField
        {...register('name', { required: true })}
        error={!!errors.name}
        helperText={errors.name && '内容を入力してください。'}
        className="block w-full"
        multiline
      />
    </Box>
  )
}

export const Form = ({ className, onSubmit, data, onClose, action, mode }: Props) => {
  console.log('Form mode', mode)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useRyoteiForm(data)
  const {
    register: tripRegister,
    handleSubmit: tripHandleSubmit,
    control: tripControl,
    formState: { errors: tripErrors },
  } = useTripForm(data)

  const handleClick: SubmitHandler<RyoteiInsertInput> = async (formData) => {
    const submitData = mode === 'delete' ? data : formData
    onSubmit && (await onSubmit(submitData as RyoteiInsertInput))
  }

  const classProps = clsx('flex flex-col justify-between p-5 box-border', className)
  const content =
    mode === 'delete' ? (
      <DeleteContent />
    ) : mode === 'deleteTrip' ? (
      <DeleteTripContent />
    ) : mode === 'withdrawAccount' ? (
      <WithdrawAccountContent />
    ) : mode === 'edit' ? (
      <CreateUpdateContent register={register} control={control} errors={errors} />
    ) : mode === 'addEditTrip' ? (
      <AddTripContent register={tripRegister} errors={tripErrors} />
    ) : mode === 'addRyotei' ? (
      <CreateUpdateContent register={register} control={control} errors={errors} />
    ) : (
      <CreateUpdateContent register={register} control={control} errors={errors} />
    )

  const submit =
    mode === 'delete'
      ? () => handleClick(data as RyoteiInsertInput)
      : mode === 'deleteTrip'
      ? () => handleClick(data as RyoteiInsertInput)
      : mode === 'withdrawAccount'
      ? () => handleClick(data as RyoteiInsertInput)
      : mode === 'edit'
      ? handleSubmit(handleClick)
      : mode === 'addEditTrip'
      ? tripHandleSubmit(handleClick)
      : mode === 'addRyotei'
      ? handleSubmit(handleClick)
      : handleSubmit(handleClick)

  return (
    <div className={classProps}>
      {content}
      <div className="flex justify-between gap-2">
        <Button onClick={() => onClose?.()} className="block w-full">
          キャンセル
        </Button>
        <Button
          onClick={submit}
          className="block w-full"
          variant="contained"
          color={mode === 'withdrawAccount' || mode === 'delete' || mode === 'deleteTrip' ? 'error' : 'primary'}
        >
          {action?.label || '登録'}
        </Button>
      </div>
    </div>
  )
}
