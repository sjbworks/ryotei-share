'use client'
import { Timeline, BottomSheet, Layout, Form, Button, AddIcon, FormInput, TimeLineProps } from '@/component'
import { useState, useMemo, MouseEvent } from 'react'
import dayjs from 'dayjs'

type Ryotei = Array<FormInput>
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
  const [bottomOpen, setBottomOpen] = useState(false)
  const handleClick = () => setBottomOpen(!bottomOpen)
  const onBottomClose = () => setBottomOpen(false)
  const onBottomOpen = () => setBottomOpen(true)
  const bottomSheet = { open: bottomOpen, onOpen: onBottomOpen, onClose: onBottomClose }
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const [data, setData] = useState<Ryotei>([])

  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
  }
  const menuItems = [
    { label: '削除', action: () => console.log('削除') },
    { label: '編集', action: () => console.log('編集') },
  ]
  const onMenuClose = () => setAnchor(null)
  const items = {
    onClick,
    onClose: onMenuClose,
    anchor,
    menuItems,
  }

  const grouped: { [key: string]: TimeLineProps['items'] } = useMemo(() => {
    const groupedData: { [key: string]: TimeLineProps['items'] } = data.reduce(
      (acc, { datetime, description }) => {
        const date = dayjs(datetime).format('YYYY-MM-DD')
        if (date in acc) {
          acc[date].push({ time: dayjs(datetime).format('HH:mm'), label: description, ...items })
        } else {
          acc[date] = [{ time: dayjs(datetime).format('HH:mm'), label: description, ...items }]
        }
        return acc
      },
      {} as { [key: string]: TimeLineProps['items'] }
    )

    const sortedKeys = Object.keys(groupedData).sort() // キーを'YYYY-MM-DD'順にソート

    const sortedGroupedData: { [key: string]: TimeLineProps['items'] } = {}
    sortedKeys.forEach((key) => {
      sortedGroupedData[key] = groupedData[key]
    })

    return sortedGroupedData
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

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
