'use client'
import { FormInput } from '@/component'
import { TimelineItemProps } from '@/component/Timeline/TimelineItem'
import { Action } from '@/component/Timeline/MenuControl'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'

type TimelineItems = { plan: TimelineItemProps['plan'] }[]
type Ryotei = Array<FormInput>

export const useTimeline = () => {
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }

  const [data, setData] = useState<Ryotei>([])
  const onMenuClick = (action: Action, plan: TimelineItemProps['plan']) => {
    console.log(action, plan)
  }

  const grouped: { [key: string]: TimelineItems } = useMemo(() => {
    const groupedData: { [key: string]: TimelineItems } = data.reduce(
      (acc, { datetime, description }) => {
        const date = dayjs(datetime).format('YYYY-MM-DD')
        if (date in acc) {
          acc[date].push({ plan: { time: dayjs(datetime).format('HH:mm'), label: description } })
        } else {
          acc[date] = [{ plan: { time: dayjs(datetime).format('HH:mm'), label: description } }]
        }
        return acc
      },
      {} as { [key: string]: TimelineItems }
    )

    const sortedKeys = Object.keys(groupedData).sort()

    const sortedGroupedData: { [key: string]: TimelineItems } = {}
    sortedKeys.forEach((key) => {
      sortedGroupedData[key] = groupedData[key]
    })

    return sortedGroupedData
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const setNewData = (newData: FormInput) => setData([...data, newData])
  return {
    grouped,
    bottomSheet,
    setNewData,
    handleClick,
    onMenuClick,
  }
}
