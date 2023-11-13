'use client'
import { Timeline, BottomSheet, Layout, Form, Button } from '@/component'
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
  const containerStyle = 'flex min-h-screen flex-col items-center justify-between p-10'

  return (
    <main className={containerStyle}>
      <Layout>
        <Timeline items={items} />
        <Button onClick={handleClick}>旅程を登録</Button>
        <BottomSheet {...bottomSheet} className="p-10">
          <Form />
        </BottomSheet>
      </Layout>
    </main>
  )
}
