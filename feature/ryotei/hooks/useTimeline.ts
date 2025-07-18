'use client'
import { Plan } from '@/component/Timeline/TimelineItem'
import { ActionType } from '@/feature/ryotei/types'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import {
  MUTATION_ADD_RYOTEI,
  MUTATION_DELETE_RYOTEI,
  MUTATION_UPDATE_RYOTEI,
  MUTATION_ADD_TRIP,
} from '@/feature/ryotei/graphql'
import { useMutation } from '@apollo/client'
import {
  InsertIntoryoteiCollectionMutation as AddRyoteiMutation,
  InsertIntoryoteiCollectionMutationVariables as AddRyoteiMutationVariables,
  UpdateryoteiCollectionMutation as UpdateRyoteiMutation,
  UpdateryoteiCollectionMutationVariables as UpdateRyoteiMutationVariables,
  DeleteFromryoteiCollectionMutation as DeleteRyoteiMutation,
  DeleteFromryoteiCollectionMutationVariables as DeleteRyoteiMutationVariables,
  InsertIntotripsCollectionMutation as AddTripMutation,
  InsertIntotripsCollectionMutationVariables as AddTripMutationVariables,
  RyoteiInsertInput,
  TripsInsertInput,
} from '@/feature/api/graphql'

type Ryotei = Array<RyoteiInsertInput>

type FormSubmitData<T extends ActionType | null> = T extends 'addTrip' ? TripsInsertInput : RyoteiInsertInput

export const useTimeline = (
  refetch: () => void,
  refetchTrip: () => void,
  selectedTripId?: string,
  onSideClose?: () => void
) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }
  const [data, setData] = useState<Ryotei>([])
  const [redirectReq, setRedirecReq] = useState(false)
  const [mode, setMode] = useState<ActionType | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<RyoteiInsertInput | null>(null)
  const [trip, setTrip] = useState<TripsInsertInput | null>(null)
  const onMenuClick = (action: ActionType, plan: Plan) => {
    setModalOpen(true)
    setMode(action)
    setSelectedPlan(plan)
  }
  const [addRyotei] = useMutation<AddRyoteiMutation, AddRyoteiMutationVariables>(MUTATION_ADD_RYOTEI)
  const [deleteRyotei] = useMutation<DeleteRyoteiMutation, DeleteRyoteiMutationVariables>(MUTATION_DELETE_RYOTEI)
  const [updateRyotei] = useMutation<UpdateRyoteiMutation, UpdateRyoteiMutationVariables>(MUTATION_UPDATE_RYOTEI)
  const [addTrip] = useMutation<AddTripMutation, AddTripMutationVariables>(MUTATION_ADD_TRIP)

  const setNewData = async (newData: RyoteiInsertInput) => {
    try {
      const dataWithTripId: RyoteiInsertInput = {
        ...newData,
        trip_id: newData.trip_id || selectedTripId,
      }
      console.log('newData.trip_id', newData.trip_id)
      console.log('selectedTripId', selectedTripId)
      await addRyotei({ variables: { objects: dataWithTripId } })
      await refetch()
      onBottomClose()
    } catch (e) {
      setRedirecReq(true)
    }
    setData([...data, newData])
  }

  const bottomFormProps = {
    isOpen: bottomOpen,
    onSubmit: setNewData,
    onClose: () => onBottomClose(),
  }

  const onClickAddRyotei = () => {
    setMode('addTrip')
    onSideClose?.()
    setModalOpen(true)
  }

  const formProps = {
    isOpen: modalOpen,
    data: mode === 'addTrip' ? trip : selectedPlan,
    onSubmit: async (data: FormSubmitData<typeof mode>) => {
      await setSelectedPlan(data)
      if (mode === 'edit') {
        const ryoteiData = data as RyoteiInsertInput
        await updateRyotei({
          variables: {
            set: {
              datetime: ryoteiData?.datetime.toISOString(),
              description: ryoteiData?.description,
            },
            filter: { id: { eq: selectedPlan?.id } },
          },
        })
      } else if (mode === 'delete') {
        await deleteRyotei({ variables: { filter: { id: { eq: selectedPlan?.id } } } })
      } else if (mode === 'addTrip') {
        const tripData = data as TripsInsertInput
        await addTrip({ variables: { objects: { name: tripData?.name } } })
      }

      await refetch()
      await refetchTrip()
      setModalOpen(false)
    },
    onClose: () => setModalOpen(false),
    action: {
      label: mode === 'edit' ? '更新' : mode === 'delete' ? '削除' : '追加',
    },
    mode: mode,
  }

  useEffect(() => void (redirectReq && redirect('/login')), [redirectReq])
  return {
    mode,
    bottomSheet,
    setNewData,
    handleClick,
    onMenuClick,
    formProps,
    modalOpen,
    bottomFormProps,
    onClickAddRyotei,
  }
}
