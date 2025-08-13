import { useState } from 'react'

export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(prev => !prev)

  return {
    isOpen,
    open,
    close,
    toggle,
    bottomSheetProps: {
      open: isOpen,
      onOpen: open,
      onClose: close,
    },
  }
}