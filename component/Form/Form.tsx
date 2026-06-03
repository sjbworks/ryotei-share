'use client'
import { SubmitHandler } from 'react-hook-form'
import { RyoteiInsertInput, TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'
import { useRyoteiForm, useTripForm, saveFormValues } from './hooks'
import { DeleteContent } from './DeleteContent'
import { DeleteTripContent } from './DeleteTripContent'
import { WithdrawAccountContent } from './WithdrawAccountContent'
import { ShareTripContent } from './ShareTripContent'
import { ChangeTripStatusContent } from './ChangeTripStatusContent'
import { CreateUpdateContent } from './CreateUpdateContent'
import { AddTripContent } from './AddTripContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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

const modeTitle: Record<string, string> = {
  addRyotei: '予定を入力',
  editRyotei: '予定を入力',
  addTrip: '旅程名を入力',
  editTrip: '旅程名を入力',
  deleteRyotei: '予定を削除',
  deleteTrip: '旅程を削除',
  withdrawAccount: '退会',
  shareTrip: '旅程をシェア',
  switchTripStatus: 'シェア設定',
}

const isDestructiveMode = (mode?: ActionType | null) =>
  mode === 'withdrawAccount' || mode === 'deleteRyotei' || mode === 'deleteTrip'

export const Form = ({ onSubmit, data, onClose, action, mode, open }: Props) => {
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

    if ((mode === 'addRyotei' || mode === 'editRyotei') && 'datetime' in formData && 'description' in formData) {
      saveFormValues(formData.datetime as Date, formData.description as string)
    }

    if (onSubmit) {
      onSubmit(submitData as RyoteiInsertInput | ShareInsertInput)
    }
  }

  const renderContent = () => {
    switch (mode) {
      case 'deleteRyotei':
        return <DeleteContent />
      case 'deleteTrip':
        return <DeleteTripContent />
      case 'withdrawAccount':
        return <WithdrawAccountContent />
      case 'addTrip':
      case 'editTrip':
        return <AddTripContent register={tripRegister} errors={tripErrors} />
      case 'shareTrip':
        return <ShareTripContent />
      case 'switchTripStatus':
        return <ChangeTripStatusContent key={String(open)} data={data as ShareInsertInput} />
      default:
        return <CreateUpdateContent register={register} control={control} errors={errors} />
    }
  }

  const getSubmitHandler = () => {
    switch (mode) {
      case 'deleteRyotei':
      case 'deleteTrip':
      case 'withdrawAccount':
      case 'shareTrip':
        return () => handleClick(data as RyoteiInsertInput | ShareInsertInput)
      case 'addTrip':
      case 'editTrip':
        return tripHandleSubmit(handleClick)
      default:
        return handleSubmit(handleClick)
    }
  }

  const title = mode ? (modeTitle[mode] ?? '予定を入力') : '予定を入力'
  const destructive = isDestructiveMode(mode)

  return (
    <div>
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '0.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          onClick={onClose}
          aria-label="フォームを閉じる"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <ExpandMoreIcon sx={{ fontSize: 18, color: 'var(--ink-2)' }} />
        </button>
        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{title}</span>
      </div>

      <div style={{ padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {renderContent()}

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button
            onClick={() => onClose?.()}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 14,
              border: '0.5px solid var(--border-md)',
              background: '#fff',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ink-2)',
              cursor: 'pointer',
            }}
          >
            キャンセル
          </button>
          <button
            onClick={getSubmitHandler()}
            style={{
              flex: 2,
              height: 48,
              borderRadius: 14,
              border: 'none',
              background: destructive ? '#dc2626' : 'var(--sun)',
              fontSize: 14,
              fontWeight: 500,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {action?.label || '登録'}
          </button>
        </div>
      </div>
    </div>
  )
}
