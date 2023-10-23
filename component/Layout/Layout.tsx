'use client'
import Button from '@mui/material/Button'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <div>
      <header className="flex">
        <Button className="justify-end">共有する</Button>
      </header>
      {children}
    </div>
  )
}
