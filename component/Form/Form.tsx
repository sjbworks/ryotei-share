'use client'
import { Controller, SubmitHandler, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
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
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState, useEffect } from 'react'

type Props = {
  className?: string
  onSubmit?: (data: RyoteiInsertInput | ShareInsertInput) => void
  data?: RyoteiInsertInput | TripsInsertInput | ShareInsertInput | null
  onClose?: () => void
  action?: {
    label: string
  }
  mode?: ActionType | null
  open?: boolean
}

const DeleteContent = () => {
  return <Box sx={{ paddingY: '16px', fontSize: '0.875rem', fontWeight: 600 }}>この予定を削除しますか？</Box>
}

const DeleteTripContent = () => {
  return <Box sx={{ paddingY: '16px', fontSize: '0.875rem', fontWeight: 600 }}>この旅程を削除しますか？</Box>
}

const WithdrawAccountContent = () => {
  return (
    <Box sx={{ paddingY: '16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ fontSize: '0.875rem', fontWeight: 600 }}>退会しますか？</Box>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ fontSize: '0.875rem', wordBreak: 'break-word' }}>
          退会すると、今まで登録していた旅程や
          <br />
          シェアしたページは全て失われます。
        </Box>
      </Box>
    </Box>
  )
}

const ShareTripContent = () => {
  return <Box sx={{ paddingY: '16px', fontSize: '0.875rem', fontWeight: 600 }}>この旅程をシェアしますか？</Box>
}

const ChangeTripStatusContent = ({ data, open }: { data?: ShareInsertInput | null; open?: boolean }) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = data?.share_id ? `${window.location.origin}/${data.share_id}` : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  useEffect(() => {
    open === false && setCopied(false)
  }, [open])

  return (
    <Box sx={{ paddingY: '16px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 1, color: 'grey.700' }}>シェアしているURL</Box>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          style={{ wordBreak: 'break-all', display: 'inline', fontSize: '0.875rem' }}
        >
          {shareUrl}
          <OpenInNewIcon
            fontSize="small"
            sx={{ color: 'primary.main', marginLeft: '4px', verticalAlign: 'text-bottom' }}
          />
        </a>
      </Box>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'grey.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
          marginBottom: 4,
        }}
      >
        <Box sx={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 1, color: 'grey.700' }}>リンクをコピー</Box>
        <TextField
          value={shareUrl}
          fullWidth
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink} edge="end">
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: { marginLeft: 0 },
            },
          }}
          helperText={copied ? 'リンクをコピーしました' : ''}
        />
      </Box>
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
      <Box sx={{ fontWeight: 600 }}>予定を入力</Box>
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

export const Form = ({ className, onSubmit, data, onClose, action, mode, open }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useRyoteiForm(data)
  const {
    register: tripRegister,
    handleSubmit: tripHandleSubmit,
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
      <ChangeTripStatusContent data={data as ShareInsertInput} open={open} />
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
