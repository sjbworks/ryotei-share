'use client'
import { SubmitHandler } from 'react-hook-form'
import { Button } from '@/component/Button'
import clsx from 'clsx'
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

    if ((mode === 'addRyotei' || mode === 'editRyotei') && 'datetime' in formData && 'description' in formData) {
      saveFormValues(formData.datetime as Date, formData.description as string)
    }

    if (onSubmit) {
      await onSubmit(submitData as RyoteiInsertInput | ShareInsertInput)
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

  const classProps = clsx('flex flex-col justify-between p-5 box-border', className)

  return (
    <div className={classProps}>
      {renderContent()}
      <div className="flex justify-between gap-4">
        <Button onClick={() => onClose?.()} className="block w-full">
          キャンセル
        </Button>
        <Button
          onClick={getSubmitHandler()}
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
