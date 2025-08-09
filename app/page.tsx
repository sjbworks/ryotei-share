import { MainView } from '@/feature/ryotei/components/MainView'

export const runtime = 'edge'

export default async function Home() {
  console.log('HomePage rendering...', {
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  })
  return <MainView />
}
