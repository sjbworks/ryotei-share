'use client'
import { useState, useMemo, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RyoteiInsertInput, TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'
import { useRyoteiForm, useTripForm, saveFormValues } from './hooks'
import type { PlaceData } from './PlaceAutocomplete'
import { DeleteContent } from './DeleteContent'
import { DeleteTripContent } from './DeleteTripContent'
import { WithdrawAccountContent } from './WithdrawAccountContent'
import { ShareTripContent } from './ShareTripContent'
import { ChangeTripStatusContent } from './ChangeTripStatusContent'
import { CreateUpdateContent } from './CreateUpdateContent'
import { AddTripContent } from './AddTripContent'
import { Button } from '@/component/Button'
import { Text } from '@/component/Text'
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
  const initialPlace = useMemo<PlaceData | null>(() => {
    if (!data || !('place_name' in data) || !data.place_name) return null
    const d = data as RyoteiInsertInput
    return {
      name: d.place_name as string,
      placeId: (d.place_id as string | null) ?? '',
      lat: (d.latitude as number | null) ?? 0,
      lng: (d.longitude as number | null) ?? 0,
    }
  }, [data])

  const [placeData, setPlaceData] = useState<PlaceData | null>(initialPlace)

  useEffect(() => {
    setPlaceData(initialPlace)
  }, [initialPlace])

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
    let submitData: RyoteiInsertInput | ShareInsertInput =
      mode === 'deleteRyotei' || mode === 'shareTrip'
        ? (data as RyoteiInsertInput | ShareInsertInput)
        : formData

    if ((mode === 'addRyotei' || mode === 'editRyotei') && 'datetime' in formData && 'description' in formData) {
      saveFormValues(formData.datetime as Date, formData.description as string)
      submitData = {
        ...submitData,
        place_name: placeData?.name ?? null,
        place_id: placeData?.placeId ?? null,
        latitude: placeData?.lat ?? null,
        longitude: placeData?.lng ?? null,
      } as RyoteiInsertInput
    }

    if (onSubmit) {
      onSubmit(submitData)
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
        return <ShareTripContent onPublish={getSubmitHandler()} onClose={onClose} />
      case 'switchTripStatus':
        return (
          <ChangeTripStatusContent
            key={String(open)}
            data={data as ShareInsertInput}
            onStopSharing={getSubmitHandler()}
          />
        )
      default:
        return (
          <CreateUpdateContent
            register={register}
            control={control}
            errors={errors}
            initialPlace={initialPlace}
            onPlaceChange={setPlaceData}
          />
        )
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
        <Text sx={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{title}</Text>
      </div>

      {(() => {
        const isShareMode = mode === 'shareTrip' || mode === 'switchTripStatus'
        return (
          <div style={{ padding: isShareMode ? '16px 18px 24px' : '24px 18px', display: 'flex', flexDirection: 'column', gap: isShareMode ? 0 : 16 }}>
            {renderContent()}

            {!isShareMode && (
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <Button
                  variant="secondary"
                  onClick={() => onClose?.()}
                  sx={{ flex: 1 }}
                >
                  キャンセル
                </Button>
                <Button
                  variant={destructive ? 'danger' : 'primary'}
                  onClick={getSubmitHandler()}
                  sx={{ flex: 2 }}
                >
                  {action?.label || '登録'}
                </Button>
              </div>
            )}
          </div>
        )
      })()}
    </div>
  )
}
