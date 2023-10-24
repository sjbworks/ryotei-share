'use client'
import Button from '@mui/material/Button'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
}
export const Layout = ({ children, onClick }: Props) => {
  return (
    <div>
      <header className="flex">
        <Button className="justify-end" onClick={onClick}>
          共有する
        </Button>
      </header>
      {children}
    </div>
  )
}
