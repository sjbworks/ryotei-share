'use server'
import { Plan } from '@/component/Timeline/TimelineItem'
import { format, parseISO } from 'date-fns'
import { redirect } from 'next/navigation'

export const getRyotei = async (cookies: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/ryotei`, {
      method: 'GET',
      headers: { Cookie: cookies },
    })
    const data = await res.json()
    if (data.message) throw new Error(data.message)

    const formatted = data.data.map(({ datetime, description }: Plan) => {
      return { datetime, description }
    })

    const grouped: Record<string, Plan[]> = formatted.reduce(
      (acc: Record<string, Plan[]>, { datetime, description, id }: Plan) => {
        const date = format(parseISO(datetime), 'yyyy-MM-dd')
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push({ datetime: format(parseISO(datetime), 'HH:mm'), description, id, trip_id: '' })
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
  } catch (error) {
    if (error instanceof Error) redirect('/login')
  }
}
