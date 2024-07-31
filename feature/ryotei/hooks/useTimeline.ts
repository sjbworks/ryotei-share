'use client'
import { Plan } from '@/component/Timeline/TimelineItem'
import { Action } from '@/component/Timeline/MenuControl'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { MUTATION_ADD_RYOTEI } from '@/feature/ryotei/graphql'
import { useMutation } from '@apollo/client'
import {
  InsertIntoryoteiCollectionMutation as AddRyoteiMutation,
  InsertIntoryoteiCollectionMutationVariables as AddRyoteiMutationVariables,
  RyoteiInsertInput,
} from '@/feature/api/graphql'

type Ryotei = Array<RyoteiInsertInput>

export const useTimeline = () => {
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }
  const [data, setData] = useState<Ryotei>([])
  const [redirectReq, setRedirecReq] = useState(false)
  const onMenuClick = (action: Action, plan: Plan) => {
    console.log(action, plan)
  }
  const [addRyotei] = useMutation<AddRyoteiMutation, AddRyoteiMutationVariables>(MUTATION_ADD_RYOTEI)

  const setNewData = async (newData: RyoteiInsertInput) => {
    try {
      await addRyotei({ variables: { objects: newData } })
    } catch (e) {
      setRedirecReq(true)
    }
    setData([...data, newData])
  }

  useEffect(() => void (redirectReq && redirect('/login')), [redirectReq])
  return {
    bottomSheet,
    setNewData,
    handleClick,
    onMenuClick,
  }
}
