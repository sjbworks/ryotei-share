// import { cookies } from 'next/headers'
import { Plan } from '@/component/Timeline/TimelineItem'
import { format, parseISO } from 'date-fns'

export const getRyotei = async (cookies: string) => {
  try {
    const res = await fetch('http://localhost:3000/api/ryotei', {
      method: 'GET',
      headers: { Cookie: cookies },
    })
    const data = await res.json()

    const formatted = data.data.map(({ datetime, description }: Plan) => {
      return { datetime, description }
    })

    const grouped: Record<string, Plan[]> = formatted.reduce(
      (acc: Record<string, Plan[]>, { datetime, description }: Plan) => {
        const date = format(parseISO(datetime), 'yyyy-MM-dd')
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push({ datetime: format(parseISO(datetime), 'HH:mm'), description })
        return acc
      },
      {}
    )

    const sortedGrouped = Object.keys(grouped)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = grouped[key]
          return acc
        },
        {} as Record<string, Plan[]>
      )

    return sortedGrouped
  } catch {}
}
