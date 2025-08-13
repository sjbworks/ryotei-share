'use client'
import { useModal } from './useModal'
import { useBottomSheet } from './useBottomSheet'
import { useRyoteiCRUD } from './useRyoteiCRUD'
import { useTripCRUD } from './useTripCRUD'
import { useFormState } from './useFormState'
import { RyoteiInsertInput, TripsInsertInput } from '@/feature/api/graphql'

type FormSubmitData = RyoteiInsertInput | TripsInsertInput

export const useTimelineNew = (
  refetch: () => void,
  refetchTrip: () => void,
  selectedTripId?: string,
  onSideClose?: () => void,
  onChangeTripId?: (id: string) => void
) => {
  const modal = useModal()
  const bottomSheet = useBottomSheet()
  const { createRyotei, updateRyoteiById, deleteRyoteiById } = useRyoteiCRUD(selectedTripId, refetch)
  const { createTrip } = useTripCRUD(refetchTrip, onChangeTripId)
  const formState = useFormState()

  const onMenuClick = formState.onMenuClick

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
    await formState.setSelectedPlan(data)
    
    if (formState.mode === 'edit') {
      const ryoteiData = data as RyoteiInsertInput
      await updateRyoteiById(formState.selectedPlan?.id, ryoteiData)
    } else if (formState.mode === 'delete') {
      await deleteRyoteiById(formState.selectedPlan?.id)
    } else if (formState.mode === 'addTrip') {
      const tripData = data as TripsInsertInput
      await createTrip(tripData)
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
    data: formState.mode === 'addTrip' ? formState.trip : formState.selectedPlan,
    onSubmit: handleModalSubmit,
    onClose: modal.close,
    action: {
      label: formState.mode === 'edit' ? '更新' : formState.mode === 'delete' ? '削除' : '追加',
    },
    mode: formState.mode,
  }

  return {
    handleClick: bottomSheet.toggle,
    bottomSheet: bottomSheet.bottomSheetProps,
    formProps,
    bottomFormProps,
    modalOpen: modal.isOpen,
    onMenuClick,
    onClickAddTrip,
  }
}