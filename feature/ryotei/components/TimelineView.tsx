'use client'

import { Timeline, BottomSheet, Layout, Form, Button, AddIcon, Plan, NoData } from '@/component'
import { useTimeline } from '@/feature/ryotei/hooks/useTimeline'
import { useMemo } from 'react'
import { QUERY_GET_RYOTEI } from '@/feature/api/supabase'
import { GetRyoteiQuery, GetRyoteiQueryVariables, RyoteiOrderBy } from '@/feature/api/graphql'
import { useQuery } from '@apollo/client'
import { format, parseISO } from 'date-fns'

type Props = { data?: Record<string, Plan[]> }

export const TimelineView = ({ data }: Props) => {
  const containerStyle = 'flex flex-col justify-between p-10 max-w-xl m-auto container'
  const { handleClick, bottomSheet, setNewData, onMenuClick } = useTimeline()
  const isExist = useMemo(() => data && Object.keys(data).length > 0, [data])

  const { data: a } = useQuery<GetRyoteiQuery, GetRyoteiQueryVariables>(QUERY_GET_RYOTEI, {
    variables: { orderBy: 'datetime' as RyoteiOrderBy },
  })
  // console.log(a)
  const res = a?.ryoteiCollection?.edges?.map((edge) => edge.node)
  const grouped: Record<string, Plan[]> | undefined = res?.reduce(
    (acc: Record<string, Plan[]>, { id, datetime, description }: Plan) => {
      const date = format(parseISO(datetime), 'yyyy-MM-dd')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push({ datetime: format(parseISO(datetime), 'HH:mm'), description, id })
      return acc
    },
    {}
  )

  return (
    <>
      {isExist ? (
        Object.entries(grouped || {}).map(([key, b]) => (
          <Timeline key={key} title={key} items={b} onClick={onMenuClick} className="mb-3" />
        ))
      ) : (
        <NoData />
      )}
      <Button variant="text" className="flex mt-4 items-center justify-items-center" onClick={handleClick}>
        <AddIcon />
        旅程を登録
      </Button>
      <BottomSheet {...bottomSheet}>
        <Form className={containerStyle} setData={setNewData} />
      </BottomSheet>
    </>
  )
}
