import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const className = clsx(inter.className, 'min-w-[50%]')
  return (
    <html lang="en">
      <body className={className}>{children}</body>
    </html>
  )
}
