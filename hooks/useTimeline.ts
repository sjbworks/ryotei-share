'use client'
import { FormInput } from '@/component'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'

type TimelineItems = { time: string; label: string }[]
type Ryotei = Array<FormInput>

export const useTimeline = () => {
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }

  const [data, setData] = useState<Ryotei>([])

  const grouped: { [key: string]: TimelineItems } = useMemo(() => {
    const groupedData: { [key: string]: TimelineItems } = data.reduce(
      (acc, { datetime, description }) => {
        const date = dayjs(datetime).format('YYYY-MM-DD')
        if (date in acc) {
          acc[date].push({ time: dayjs(datetime).format('HH:mm'), label: description })
        } else {
          acc[date] = [{ time: dayjs(datetime).format('HH:mm'), label: description }]
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

  console.log(grouped)
  const setNewData = (newData: FormInput) => setData([...data, newData])
  return {
    grouped,
    bottomSheet,
    setNewData,
    handleClick,
  }
}
