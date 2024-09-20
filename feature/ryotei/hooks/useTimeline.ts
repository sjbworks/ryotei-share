'use client'
import { Plan } from '@/component/Timeline/TimelineItem'
import { Action } from '@/component/Timeline/MenuControl'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { MUTATION_ADD_RYOTEI, MUTATION_DELETE_RYOTEI, MUTATION_UPDATE_RYOTEI } from '@/feature/ryotei/graphql'
import { useMutation } from '@apollo/client'
import {
  InsertIntoryoteiCollectionMutation as AddRyoteiMutation,
  InsertIntoryoteiCollectionMutationVariables as AddRyoteiMutationVariables,
  UpdateryoteiCollectionMutation as UpdateRyoteiMutation,
  UpdateryoteiCollectionMutationVariables as UpdateRyoteiMutationVariables,
  DeleteFromryoteiCollectionMutation as DeleteRyoteiMutation,
  DeleteFromryoteiCollectionMutationVariables as DeleteRyoteiMutationVariables,
  RyoteiInsertInput,
} from '@/feature/api/graphql'

type Ryotei = Array<RyoteiInsertInput>

export const useTimeline = (refetch: () => void) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }
  const [data, setData] = useState<Ryotei>([])
  const [redirectReq, setRedirecReq] = useState(false)
  const [mode, setMode] = useState<Action | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<RyoteiInsertInput | null>(null)
  const onMenuClick = (action: Action, plan: Plan) => {
    console.log(action, plan)
    setModalOpen(true)
    setMode(action)
    setSelectedPlan(plan)
  }
  const [addRyotei] = useMutation<AddRyoteiMutation, AddRyoteiMutationVariables>(MUTATION_ADD_RYOTEI)
  const [deleteRyotei] = useMutation<DeleteRyoteiMutation, DeleteRyoteiMutationVariables>(MUTATION_DELETE_RYOTEI)
  const [updateRyotei] = useMutation<UpdateRyoteiMutation, UpdateRyoteiMutationVariables>(MUTATION_UPDATE_RYOTEI)

  const setNewData = async (newData: RyoteiInsertInput) => {
    try {
      await addRyotei({ variables: { objects: newData } })
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
    onClose: () => setModalOpen(false),
  }

  const formProps = {
    isOpen: modalOpen,
    data: selectedPlan,
    onSubmit: setSelectedPlan,
    onClose: () => setModalOpen(false),
    action: {
      label: mode === 'edit' ? '編集' : '削除',
      onClick: async (data: RyoteiInsertInput) => {
        mode === 'edit'
          ? updateRyotei({
              variables: {
                set: {
                  datetime: data?.datetime.toISOString(),
                  description: selectedPlan?.description,
                },
                filter: { id: { eq: selectedPlan?.id } },
              },
            })
          : deleteRyotei({ variables: { filter: { id: { eq: selectedPlan?.id } } } })

        await refetch()
        setModalOpen(false)
      },
    },
  }

  useEffect(() => void (redirectReq && redirect('/login')), [redirectReq])
  return {
    mode,
    bottomSheet,
    setNewData,
    handleClick,
    onMenuClick,
    formProps,
    isOpen: modalOpen,
    bottomFormProps,
  }
}
