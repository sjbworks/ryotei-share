'use client'
import { useModal } from './useModal'
import { useBottomSheet } from './useBottomSheet'
import { useRyoteiCRUD } from './useRyoteiCRUD'
import { useTripCRUD } from './useTripCRUD'
import { useFormState } from './useFormState'
import { RyoteiInsertInput, TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'
import { ActionType } from '@/feature/ryotei/types'
import { Plan } from '@/component/Timeline/TimelineItem'
import { useShareSettingCRUD } from './useShareSettingCRUD'
import { useEffect } from 'react'

type FormSubmitData = RyoteiInsertInput | TripsInsertInput | ShareInsertInput

export const useTimeline = (
  refetch: () => void,
  refetchTrip: () => void,
  selectedTripId?: string,
  onSideClose?: () => void,
  onChangeTripId?: (id: string) => void
) => {
  const modal = useModal()
  const bottomSheet = useBottomSheet()
  const { createRyotei, updateRyoteiById, deleteRyoteiById } = useRyoteiCRUD(selectedTripId, refetch)
  const { createTrip, updateTrip, deleteTrip } = useTripCRUD(refetchTrip, onChangeTripId)
  const formState = useFormState()
  const { shareTrip, checkExistShareData, changePublishState } = useShareSettingCRUD()

  const onMenuClick = (action: ActionType, plan: Plan) => {
    formState.onMenuClick(action, plan)
    bottomSheet.open()
  }

  const onClickAddTrip = () => {
    formState.setAddTripMode()
    onSideClose?.()
    bottomSheet.open()
  }

  const handleBottomSubmit = async (data: FormSubmitData) => {
    if (formState.mode !== 'deleteRyotei' && formState.mode !== 'deleteTrip') {
      await formState.setSelectedPlan(data)
    }

    if (formState.mode === 'addRyotei') {
      await createRyotei(data as RyoteiInsertInput)
    } else if (formState.mode === 'editRyotei') {
      const ryoteiData = data as RyoteiInsertInput
      await updateRyoteiById(formState.selectedPlan?.id, ryoteiData)
    } else if (formState.mode === 'deleteRyotei') {
      formState.selectedPlan?.id && (await deleteRyoteiById(formState.selectedPlan?.id))
    } else if (formState.mode === 'deleteTrip') {
      if (!formState.trip?.id) return
      await deleteTrip({ id: formState.trip.id })
    } else if (formState.mode === 'addTrip') {
      const tripData = data as TripsInsertInput
      await createTrip(tripData)
    } else if (formState.mode === 'editTrip') {
      const tripData = data as TripsInsertInput
      const tripId = tripData.id || formState.trip?.id
      if (tripId) {
        await updateTrip({ id: tripId, name: tripData.name })
      }
    } else if (formState.mode === 'withdrawAccount') {
      // Handle withdraw account logic here
    } else if (formState.mode === 'shareTrip') {
      await shareTrip(data)
    } else if (formState.mode === 'switchTripStatus') {
      if (selectedTripId) {
        const result = await changePublishState(selectedTripId, false)
        result && formState.setShareTripMode(data)
      }
    }

    await refetch()
    await refetchTrip()
    bottomSheet.close()
  }

  const handleModalSubmit = async (data: FormSubmitData) => {
    if (formState.mode !== 'deleteRyotei' && formState.mode !== 'deleteTrip') {
      await formState.setSelectedPlan(data)
    }

    if (formState.mode === 'editRyotei') {
      const ryoteiData = data as RyoteiInsertInput
      await updateRyoteiById(formState.selectedPlan?.id, ryoteiData)
    } else if (formState.mode === 'deleteRyotei') {
      if (formState.selectedPlan?.id) {
        await deleteRyoteiById(formState.selectedPlan?.id)
      }
    } else if (formState.mode === 'deleteTrip') {
      if (!formState.trip?.id) return
      await deleteTrip({ id: formState.trip.id })
    } else if (formState.mode === 'addTrip' || formState.mode === 'editTrip') {
      const tripData = data as TripsInsertInput

      // dataからidを取得するか、formState.tripからidを取得する
      const tripId = tripData.id || formState.trip?.id

      if (tripId) {
        await updateTrip({ id: tripId, name: tripData.name })
      } else {
        await createTrip(tripData)
      }
    } else if (formState.mode === 'shareTrip') {
      await shareTrip(data)
    } else if (formState.mode === 'switchTripStatus') {
      if (selectedTripId) {
        const result = await changePublishState(selectedTripId, false)
        result && formState.setShareTripMode(data)
      }
    }

    await refetch()
    await refetchTrip()
    modal.close()
  }

  const bottomFormProps = {
    isOpen: bottomSheet.isOpen,
    onSubmit: handleBottomSubmit,
    onClose: bottomSheet.close,
    data:
      formState.mode === 'addTrip' || formState.mode === 'editTrip'
        ? formState.trip
        : formState.mode === 'shareTrip'
        ? formState.trip
        : formState.mode === 'switchTripStatus'
        ? formState.switchTripStatusData
        : formState.selectedPlan,
    action: {
      label:
        formState.mode === 'editRyotei'
          ? '更新'
          : formState.mode === 'deleteRyotei' || formState.mode === 'deleteTrip'
          ? '削除'
          : formState.mode === 'shareTrip'
          ? 'シェア'
          : formState.mode === 'switchTripStatus'
          ? '非公開'
          : formState.mode === 'addTrip'
          ? '旅程を作成'
          : formState.mode === 'addRyotei'
          ? '追加'
          : formState.mode === 'editTrip'
          ? '旅程名を変更'
          : formState.mode === 'withdrawAccount'
          ? '退会'
          : '追加',
    },
    mode: formState.mode,
  }

  const formProps = {
    isOpen: modal.isOpen,
    data:
      formState.mode === 'addTrip' || formState.mode === 'editTrip'
        ? formState.trip
        : formState.mode === 'shareTrip'
        ? { trip_id: selectedTripId }
        : formState.mode === 'switchTripStatus'
        ? formState.switchTripStatusData
        : formState.selectedPlan,
    onSubmit: handleModalSubmit,
    onClose: modal.close,
    action: {
      label:
        formState.mode === 'editRyotei'
          ? '更新'
          : formState.mode === 'deleteRyotei' || formState.mode === 'deleteTrip'
          ? '削除'
          : formState.mode === 'shareTrip'
          ? 'シェア'
          : formState.mode === 'switchTripStatus'
          ? '非公開'
          : '追加',
    },
    mode: formState.mode,
  }

  const isShareInsertInput = (data: any): data is ShareInsertInput => {
    return typeof data === 'object' && data !== null && 'trip_id' in data
  }

  const onClickShareTrip = async (data: FormSubmitData) => {
    if (!isShareInsertInput(data)) return

    const shareDataResult = await checkExistShareData(data.trip_id)
    if (shareDataResult.exists && shareDataResult.is_public) {
      formState.setSwitchTripStatusMode({ ...data, share_id: shareDataResult.share_id })
    } else {
      formState.setShareTripMode(data)
    }
    bottomSheet.open()
  }

  return {
    handleClick: bottomSheet.toggle,
    bottomSheet: bottomSheet.bottomSheetProps,
    formProps,
    bottomFormProps,
    modalOpen: modal.isOpen,
    onMenuClick,
    onClickAddTrip,
    handleModalSubmit,
    formState,
    shareTrip,
    onClickShareTrip,
  }
}
