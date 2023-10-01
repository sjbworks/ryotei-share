import { Timeline } from '@/component/Timeline'

export default function Home() {
  const items = [
    {
      time: '9:00',
      label: '大宮駅　豆の木',
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Timeline items={items} />
    </main>
  )
}
