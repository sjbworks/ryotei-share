'use client'
import { Timeline, BottomSheet, Layout, Form, Button, AddIcon, FormInput } from '@/component'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'

type Ryotei = Array<FormInput>

export default function Home() {
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  const bottomSheet = { open, onOpen, onClose }
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const [data, setData] = useState<Ryotei>([])

  const items = useMemo(
    () =>
      data?.map(({ datetime, description }) => ({
        time: dayjs(datetime).format('HH:mm'),
        label: description,
      })) || [],
    [data]
  )
  const setNewData = (newData: FormInput) => setData([...data, newData])

  return (
    <main className={containerStyle}>
      <Layout>
        <Timeline items={items} />
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
