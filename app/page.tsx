'use client'
import { Timeline, BottomSheet, Layout } from '@/component'
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
      label: '新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟新潟',
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
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  const bottomSheet = { open, onClose, onOpen }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Layout>
        <Timeline items={items} />
        <BottomSheet {...bottomSheet}>
          <div></div>
        </BottomSheet>
      </Layout>
    </main>
  )
}
