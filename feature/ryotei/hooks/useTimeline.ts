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
  const { shareTrip, checkExistShareData } = useShareSettingCRUD()

  const onMenuClick = (action: ActionType, plan: Plan) => {
    formState.onMenuClick(action, plan)
    modal.open()
  }

  const onClickAddTrip = () => {
    formState.setAddTripMode()
    onSideClose?.()
    modal.open()
  }

  const handleBottomSubmit = async (newData: RyoteiInsertInput) => {
    await createRyotei(newData)
    bottomSheet.close()
  }

  const handleModalSubmit = async (data: FormSubmitData) => {
    if (formState.mode !== 'delete' && formState.mode !== 'deleteTrip') {
      await formState.setSelectedPlan(data)
    }

    if (formState.mode === 'edit') {
      const ryoteiData = data as RyoteiInsertInput
      await updateRyoteiById(formState.selectedPlan?.id, ryoteiData)
    } else if (formState.mode === 'delete') {
      if (formState.selectedPlan?.id) {
        await deleteRyoteiById(formState.selectedPlan?.id)
      }
    } else if (formState.mode === 'deleteTrip') {
      if (!formState.trip?.id) return
      await deleteTrip({ id: formState.trip.id })
    } else if (formState.mode === 'addEditTrip') {
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
    }

    await refetch()
    await refetchTrip()
    modal.close()
  }

  const bottomFormProps = {
    isOpen: bottomSheet.isOpen,
    onSubmit: handleBottomSubmit,
    onClose: bottomSheet.close,
  }

  const formProps = {
    isOpen: modal.isOpen,
    data:
      formState.mode === 'addEditTrip'
        ? formState.trip
        : formState.mode === 'shareTrip'
        ? { trip_id: selectedTripId }
        : formState.selectedPlan,
    onSubmit: handleModalSubmit,
    onClose: modal.close,
    action: {
      label:
        formState.mode === 'edit'
          ? '更新'
          : formState.mode === 'delete' || formState.mode === 'deleteTrip'
          ? '削除'
          : formState.mode === 'shareTrip'
          ? 'シェア'
          : '追加',
    },
    mode: formState.mode,
  }

  const isShareInsertInput = (data: any): data is ShareInsertInput => {
    return typeof data === 'object' && data !== null && 'trip_id' in data
  }

  const onClickShareTrip = async (data: FormSubmitData) => {
    if (!isShareInsertInput(data)) return

    const existShareData = await checkExistShareData(data.trip_id)
    existShareData ? formState.setSwitchTripStatusMode(data) : formState.setShareTripMode(data)
    modal.open()
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
