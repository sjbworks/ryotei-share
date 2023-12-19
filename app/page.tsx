'use client'
import { Timeline, BottomSheet, Layout, Form, Button, AddIcon, TimeLineProps } from '@/component'
import { useTimeline } from '@/hooks/useTimeline'

type Props = { data: Record<string, TimeLineProps['items']> }

const Timelines = ({ data }: Props) => {
  return (
    <>
      {Object.entries(data).map(([key, data]) => (
        <Timeline key={key} title={key} items={data} className="mb-3" />
      ))}
    </>
  )
}

export default function Home() {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const { grouped, handleClick, bottomSheet, setNewData } = useTimeline()

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
