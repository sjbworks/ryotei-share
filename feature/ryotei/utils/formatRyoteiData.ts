import { Plan } from '@/component'
import { format } from 'date-fns'
import { TZDate } from '@date-fns/tz'
import { ja } from 'date-fns/locale/ja'

type RyoteiNode = {
  id: string
  datetime: string
  description: string
  trip_id: string
}

export function formatRyoteiData(nodes: RyoteiNode[] | undefined): Record<string, Plan[]> | undefined {
  if (!nodes || nodes.length === 0) return undefined

  const grouped: Record<string, Plan[]> = nodes.reduce((acc: Record<string, Plan[]>, node) => {
    const { id, datetime, description, trip_id } = node
    const rowTZDate = new TZDate(datetime + 'Z')
    const formatDate = format(rowTZDate, 'yyyy-MM-dd', { locale: ja })
    const formatRowDate = format(rowTZDate, "yyyy-MM-dd'T'HH:mm:ss.SS", { locale: ja })

    if (!acc[formatDate]) {
      acc[formatDate] = []
    }

    acc[formatDate].push({ datetime: formatRowDate, description, id, trip_id })
    acc[formatDate].sort((a, b) => a.datetime.localeCompare(b.datetime))

    return acc
  }, {})

  // ソート済みのオブジェクトを返す
  return Object.keys(grouped)
    .sort()
    .reduce((acc: Record<string, Plan[]>, key: string) => {
      acc[key] = grouped[key]
      return acc
    }, {})
}