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
  RyoteiFilter,
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
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
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

  const modalProps = {
    isOpen: modalOpen,
    onClose: () => setModalOpen(false),
    action: {
      label: mode === 'edit' ? '編集' : '削除',
      // TODO: updateRyotei
      onClick: () =>
        mode === 'edit' ? updateRyotei() : deleteRyotei({ variables: { filter: { id: { eq: selectedPlan?.id } } } }),
    },
  }

  useEffect(() => void (redirectReq && redirect('/login')), [redirectReq])
  return {
    bottomSheet,
    setNewData,
    handleClick,
    onMenuClick,
    modalProps,
  }
}
