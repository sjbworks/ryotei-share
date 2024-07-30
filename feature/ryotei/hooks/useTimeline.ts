'use client'
import { FormInput } from '@/component'
import { Plan } from '@/component/Timeline/TimelineItem'
import { Action } from '@/component/Timeline/MenuControl'
import { useEffect, useState } from 'react'
import { addRyotei } from '../api'
import { redirect } from 'next/navigation'
import { MUTATION_ADD_RYOTEI } from '@/feature/ryotei/graphql'

type Ryotei = Array<FormInput>

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

  const setNewData = async (newData: FormInput) => {
    try {
      // TODO: REPLACE THIS WITH GRAPHQL
      await addRyotei(JSON.stringify(newData))
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
