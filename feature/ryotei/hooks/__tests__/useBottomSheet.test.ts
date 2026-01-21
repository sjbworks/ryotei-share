import { renderHook, act } from '@testing-library/react'
import { useBottomSheet } from '../useBottomSheet'

describe('useBottomSheet', () => {
  describe('Initial state', () => {
    it('should initialize with isOpen as false', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.isOpen).toBe(false)
    })

    it('should provide open, close, and toggle functions', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(typeof result.current.open).toBe('function')
      expect(typeof result.current.close).toBe('function')
      expect(typeof result.current.toggle).toBe('function')
    })

    it('should provide bottomSheetProps object', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.bottomSheetProps).toBeDefined()
      expect(result.current.bottomSheetProps.open).toBe(false)
      expect(typeof result.current.bottomSheetProps.onOpen).toBe('function')
      expect(typeof result.current.bottomSheetProps.onClose).toBe('function')
    })
  })

  describe('open function', () => {
    it('should set isOpen to true when open is called', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBe(true)
    })

    it('should keep isOpen as true when open is called multiple times', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.open()
        result.current.open()
        result.current.open()
      })

      expect(result.current.isOpen).toBe(true)
    })

    it('should update bottomSheetProps.open when open is called', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.open()
      })

      expect(result.current.bottomSheetProps.open).toBe(true)
    })
  })

  describe('close function', () => {
    it('should set isOpen to false when close is called', () => {
      const { result } = renderHook(() => useBottomSheet())

      // First open it
      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBe(true)

      // Then close it
      act(() => {
        result.current.close()
      })

      expect(result.current.isOpen).toBe(false)
    })

    it('should keep isOpen as false when close is called on closed state', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.close()
      })

      expect(result.current.isOpen).toBe(false)
    })

    it('should update bottomSheetProps.open when close is called', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.open()
      })

      expect(result.current.bottomSheetProps.open).toBe(true)

      act(() => {
        result.current.close()
      })

      expect(result.current.bottomSheetProps.open).toBe(false)
    })
  })

  describe('toggle function', () => {
    it('should toggle isOpen from false to true', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isOpen).toBe(true)
    })

    it('should toggle isOpen from true to false', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isOpen).toBe(false)
    })

    it('should toggle isOpen multiple times correctly', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.toggle()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.toggle()
      })
      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.toggle()
      })
      expect(result.current.isOpen).toBe(true)
    })

    it('should update bottomSheetProps.open when toggle is called', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.toggle()
      })

      expect(result.current.bottomSheetProps.open).toBe(true)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.bottomSheetProps.open).toBe(false)
    })
  })

  describe('bottomSheetProps', () => {
    it('should have correct structure', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.bottomSheetProps).toEqual({
        open: false,
        onOpen: expect.any(Function),
        onClose: expect.any(Function),
      })
    })

    it('should call onOpen and set isOpen to true', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.bottomSheetProps.onOpen()
      })

      expect(result.current.isOpen).toBe(true)
    })

    it('should call onClose and set isOpen to false', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.bottomSheetProps.onClose()
      })

      expect(result.current.isOpen).toBe(false)
    })

    it('should have onOpen that is the same as open function', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.bottomSheetProps.onOpen).toBe(result.current.open)
    })

    it('should have onClose that is the same as close function', () => {
      const { result } = renderHook(() => useBottomSheet())

      expect(result.current.bottomSheetProps.onClose).toBe(result.current.close)
    })
  })

  describe('State transitions', () => {
    it('should handle open -> close -> open sequence', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.open()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.close()
      })
      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.open()
      })
      expect(result.current.isOpen).toBe(true)
    })

    it('should handle toggle -> open -> toggle sequence', () => {
      const { result } = renderHook(() => useBottomSheet())

      act(() => {
        result.current.toggle()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.open()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.toggle()
      })
      expect(result.current.isOpen).toBe(false)
    })

    it('should handle complex state transitions', () => {
      const { result } = renderHook(() => useBottomSheet())

      const transitions = [
        { action: () => result.current.open(), expected: true },
        { action: () => result.current.open(), expected: true },
        { action: () => result.current.toggle(), expected: false },
        { action: () => result.current.close(), expected: false },
        { action: () => result.current.toggle(), expected: true },
        { action: () => result.current.close(), expected: false },
        { action: () => result.current.bottomSheetProps.onOpen(), expected: true },
        { action: () => result.current.bottomSheetProps.onClose(), expected: false },
      ]

      transitions.forEach(({ action, expected }) => {
        act(() => {
          action()
        })
        expect(result.current.isOpen).toBe(expected)
      })
    })
  })

  describe('Multiple instances', () => {
    it('should maintain separate state for multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useBottomSheet())
      const { result: result2 } = renderHook(() => useBottomSheet())

      expect(result1.current.isOpen).toBe(false)
      expect(result2.current.isOpen).toBe(false)

      act(() => {
        result1.current.open()
      })

      expect(result1.current.isOpen).toBe(true)
      expect(result2.current.isOpen).toBe(false)

      act(() => {
        result2.current.open()
      })

      expect(result1.current.isOpen).toBe(true)
      expect(result2.current.isOpen).toBe(true)

      act(() => {
        result1.current.close()
      })

      expect(result1.current.isOpen).toBe(false)
      expect(result2.current.isOpen).toBe(true)
    })
  })
})
