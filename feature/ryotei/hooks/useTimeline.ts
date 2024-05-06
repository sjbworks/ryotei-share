'use client'
import { FormInput } from '@/component'
import { Plan } from '@/component/Timeline/TimelineItem'
import { Action } from '@/component/Timeline/MenuControl'
import { useState } from 'react'
import { addRyotei } from '../api'

type Ryotei = Array<FormInput>

export const useTimeline = () => {
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }

  const [data, setData] = useState<Ryotei>([])
  const onMenuClick = (action: Action, plan: Plan) => {
    console.log(action, plan)
  }

  const setNewData = async (newData: FormInput) => {
    await addRyotei(JSON.stringify(newData))
    setData([...data, newData])
  }
  return {
    bottomSheet,
    setNewData,
    handleClick,
    onMenuClick,
  }
}
