import './globals.css'
import { ApolloProvider } from '@/feature/provider/ApolloProvider'
import { SnackbarContextProvider } from '@/feature/provider/SnackbarContextProvider'
import { Footer } from '@/component/Footer'

export const metadata = {
  title: 'Ryotei Share',
  description: '旅程を作成するためのWebサービスです。',
  keywords: ['旅行', '旅のしおり', '行程表', '旅程', '旅程表'],
  authors: [{ name: 'Ryotei Share' }],
  openGraph: {
    title: 'Ryotei Share',
    description: '旅程を作成するためのWebサービスです。',
    type: 'website',
    locale: 'ja_JP',
    images: [{ url: '/opengraph-image.jpg' }],
  },
  twitter: {
    card: 'summary',
    title: 'Ryotei Share',
    description: '旅程を作成するためのWebサービスです。',
    images: [{ url: '/twitter-image.jpg' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        className="flex flex-col items-center"
        style={{
          fontFamily:
            'Inter, Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: '"tnum"',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ApolloProvider>
          <SnackbarContextProvider>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
              }}
            >
              {children}
            </div>
            <Footer />
          </SnackbarContextProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}
