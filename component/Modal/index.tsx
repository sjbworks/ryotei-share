'use client'
import { FC, CSSProperties, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
}

export const Modal: FC<ModalProps> = ({ children, isOpen }) => {
  if (!isOpen) return null

  return createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>{children}</div>
    </div>,
    document.body
  )
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1400,
}

const modalStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '12px',
  maxWidth: '400px',
  width: '100%',
  position: 'relative',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1500,
}
