'use client'
import { Timeline, BottomSheet, Layout, Form, Button, AddIcon } from '@/component'
import { useState } from 'react'

export default function Home() {
  const items = [
    {
      time: '9:00',
      label: '大宮駅 豆の木',
      title: 'タイトル',
    },
    {
      time: '10:00',
      label: '新潟',
    },
    {
      time: '12:00',
      label: 'スキー場',
    },
    {
      time: '13:00',
      label: 'スキー場',
    },
    {
      time: '13:00',
      label: 'スキー場',
    },
    {
      time: '13:00',
      label: 'スキー場',
    },
  ]

  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  const bottomSheet = { open, onOpen, onClose }
  const containerStyle = 'flex flex-col  justify-between p-10 max-w-xl m-auto container'

  return (
    <main className={containerStyle}>
      <Layout>
        <Timeline items={items} />
        <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
          <AddIcon />
          旅程を登録
        </Button>
        <BottomSheet {...bottomSheet} className="p-10">
          <Form />
        </BottomSheet>
      </Layout>
    </main>
  )
}
