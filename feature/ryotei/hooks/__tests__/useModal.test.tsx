import { renderHook, act } from '@testing-library/react'
import { useModal } from '../useModal'

describe('useModal', () => {
  it('should have initial state closed', () => {
    const { result } = renderHook(() => useModal())
    expect(result.current.isOpen).toBe(false)
  })

  it('should open modal when open is called', () => {
    const { result } = renderHook(() => useModal())
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('should close modal when close is called', () => {
    const { result } = renderHook(() => useModal())
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('should toggle modal state', () => {
    const { result } = renderHook(() => useModal())
    expect(result.current.isOpen).toBe(false)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(true)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(false)
  })
})
