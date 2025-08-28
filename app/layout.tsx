import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { ApolloProvider } from '@/feature/provider/ApolloProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const className = clsx(inter.className, 'flex flex-col')
  return (
    <html lang="en">
      <body className={className}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}
