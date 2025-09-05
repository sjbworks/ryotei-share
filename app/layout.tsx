import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { ApolloProvider } from '@/feature/provider/ApolloProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ryotei Share',
  description: '旅程を作成するためのWebサービスです。',
  keywords: ['旅行', '旅のしおり', '行程表', '旅程', '旅程表'],
  authors: [{ name: 'Ryotei Share' }],
  icons: {
    icon: '/favicon.jpg?v=1',
  },
  openGraph: {
    title: 'Ryotei Share',
    description: '旅程を作成するためのWebサービスです。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    title: 'Ryotei Share',
    description: '旅程を作成するためのWebサービスです。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const className = clsx(inter.className, 'flex flex-col')
  return (
    <html lang="ja">
      <body className={className}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}
