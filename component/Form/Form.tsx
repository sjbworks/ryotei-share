'use client'
import { Controller, SubmitHandler, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@/component/Button'
import clsx from 'clsx'
import { RyoteiInsertInput, TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'
import { ja } from 'date-fns/locale/ja'
import { useRyoteiForm, useTripForm } from './hooks'
import { InputAdornment, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useState } from 'react'

type Props = {
  className?: string
  onSubmit?: (data: RyoteiInsertInput | ShareInsertInput) => void
  data?: RyoteiInsertInput | TripsInsertInput | ShareInsertInput | null
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

const ShareTripContent = () => {
  return <Box sx={{ paddingY: '16px' }}>この旅程をシェアしますか？</Box>
}

const ChangeTripStatusContent = ({ data }: { data?: ShareInsertInput | null }) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = data?.share_id ? `${window.location.origin}/${data.share_id}` : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Box sx={{ paddingY: '16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>シェアリンク</Box>
      <TextField
        value={shareUrl}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopyLink} edge="end">
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={copied ? 'リンクをコピーしました' : ''}
      />
    </Box>
  )
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
  console.log('Form props - mode:', mode, 'data:', data)
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

  const handleClick: SubmitHandler<RyoteiInsertInput | ShareInsertInput> = async (formData) => {
    const submitData = mode === 'deleteRyotei' || mode === 'shareTrip' ? data : formData
    onSubmit && (await onSubmit(submitData as RyoteiInsertInput | ShareInsertInput))
  }

  const classProps = clsx('flex flex-col justify-between p-5 box-border', className)
  const content =
    mode === 'deleteRyotei' ? (
      <DeleteContent />
    ) : mode === 'deleteTrip' ? (
      <DeleteTripContent />
    ) : mode === 'withdrawAccount' ? (
      <WithdrawAccountContent />
    ) : mode === 'editRyotei' ? (
      <CreateUpdateContent register={register} control={control} errors={errors} />
    ) : mode === 'addTrip' ? (
      <AddTripContent register={tripRegister} errors={tripErrors} />
    ) : mode === 'editTrip' ? (
      <AddTripContent register={tripRegister} errors={tripErrors} />
    ) : mode === 'addRyotei' ? (
      <CreateUpdateContent register={register} control={control} errors={errors} />
    ) : mode === 'shareTrip' ? (
      <ShareTripContent />
    ) : mode === 'switchTripStatus' ? (
      <ChangeTripStatusContent data={data as ShareInsertInput} />
    ) : (
      <CreateUpdateContent register={register} control={control} errors={errors} />
    )

  const submit =
    mode === 'deleteRyotei'
      ? () => handleClick(data as RyoteiInsertInput)
      : mode === 'deleteTrip'
      ? () => handleClick(data as RyoteiInsertInput)
      : mode === 'withdrawAccount'
      ? () => handleClick(data as RyoteiInsertInput)
      : mode === 'editRyotei'
      ? handleSubmit(handleClick)
      : mode === 'addTrip'
      ? tripHandleSubmit(handleClick)
      : mode === 'editTrip'
      ? tripHandleSubmit(handleClick)
      : mode === 'addRyotei'
      ? handleSubmit(handleClick)
      : mode === 'shareTrip'
      ? () => handleClick(data as ShareInsertInput)
      : handleSubmit(handleClick)

  return (
    <div className={classProps}>
      {content}
      <div className="flex justify-between gap-4">
        <Button onClick={() => onClose?.()} className="block w-full">
          キャンセル
        </Button>
        <Button
          onClick={submit}
          className="block w-full"
          variant="contained"
          color={mode === 'withdrawAccount' || mode === 'deleteRyotei' || mode === 'deleteTrip' ? 'error' : 'primary'}
        >
          {action?.label || '登録'}
        </Button>
      </div>
    </div>
  )
}
