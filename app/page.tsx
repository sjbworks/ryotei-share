'use client'
import { Timeline, BottomSheet, Layout, Form, Button, AddIcon, FormInput } from '@/component'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'

type Ryotei = Array<FormInput>
type Props = { data: Record<string, Array<{ time: string; label: string }>> }

const Timelines = ({ data }: Props) => {
  return (
    <>
      {Object.entries(data).map(([key, data]) => (
        <Timeline key={key} title={key} items={data} />
      ))}
    </>
  )
}

export default function Home() {
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  const bottomSheet = { open, onOpen, onClose }
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const [data, setData] = useState<Ryotei>([])

  const grouped: { [key: string]: { time: string; label: string }[] } = useMemo(() => {
    const groupedData: { [key: string]: { time: string; label: string }[] } = data.reduce(
      (acc, { datetime, description }) => {
        const date = dayjs(datetime).format('YYYY-MM-DD')
        if (date in acc) {
          acc[date].push({ time: dayjs(datetime).format('HH:mm'), label: description })
        } else {
          acc[date] = [{ time: dayjs(datetime).format('HH:mm'), label: description }]
        }
        return acc
      },
      {} as { [key: string]: { time: string; label: string }[] }
    )

    const sortedKeys = Object.keys(groupedData).sort() // キーを'YYYY-MM-DD'順にソート

    const sortedGroupedData: { [key: string]: { time: string; label: string }[] } = {}
    sortedKeys.forEach((key) => {
      sortedGroupedData[key] = groupedData[key]
    })

    return sortedGroupedData
  }, [data])

  console.log(grouped)

  const setNewData = (newData: FormInput) => setData([...data, newData])

  return (
    <main className={containerStyle}>
      <Layout>
        <Timelines data={grouped} />
        <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
          <AddIcon />
          旅程を登録
        </Button>
        <BottomSheet {...bottomSheet}>
          <Form className={containerStyle} setData={setNewData} />
        </BottomSheet>
      </Layout>
    </main>
  )
}
