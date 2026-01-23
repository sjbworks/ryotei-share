import { renderHook, act } from '@testing-library/react'
import { useFormState } from '../useFormState'
import { Plan } from '@/component/Timeline/TimelineItem'
import { TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'

describe('useFormState', () => {
  describe('Initial state', () => {
    it('should initialize with null mode', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.mode).toBeNull()
    })

    it('should initialize with null selectedPlan', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.selectedPlan).toBeNull()
    })

    it('should initialize with null trip', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.trip).toBeNull()
    })

    it('should initialize with null switchTripStatusData', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.switchTripStatusData).toBeNull()
    })

    it('should provide all mode setter functions', () => {
      const { result } = renderHook(() => useFormState())

      expect(typeof result.current.setAddRyoteiMode).toBe('function')
      expect(typeof result.current.setEditRyoteiMode).toBe('function')
      expect(typeof result.current.setDeleteRyoteiMode).toBe('function')
      expect(typeof result.current.setAddTripMode).toBe('function')
      expect(typeof result.current.setEditTripMode).toBe('function')
      expect(typeof result.current.setDeleteTripMode).toBe('function')
      expect(typeof result.current.setShareTripMode).toBe('function')
      expect(typeof result.current.setSwitchTripStatusMode).toBe('function')
      expect(typeof result.current.resetMode).toBe('function')
      expect(typeof result.current.onMenuClick).toBe('function')
    })
  })

  describe('Ryotei mode setters', () => {
    describe('setAddRyoteiMode', () => {
      it('should set mode to "addRyotei"', () => {
        const { result } = renderHook(() => useFormState())

        act(() => {
          result.current.setAddRyoteiMode()
        })

        expect(result.current.mode).toBe('addRyotei')
      })

      it('should set selectedPlan to null', () => {
        const { result } = renderHook(() => useFormState())

        const mockPlan: Plan = {
          id: 'test-id',
          datetime: '2024-12-25T14:30:00',
          description: 'Test plan',
          trip_id: 'trip-1',
        }

        // First set a plan
        act(() => {
          result.current.setEditRyoteiMode(mockPlan)
        })

        expect(result.current.selectedPlan).not.toBeNull()

        // Then call setAddRyoteiMode
        act(() => {
          result.current.setAddRyoteiMode()
        })

        expect(result.current.selectedPlan).toBeNull()
      })
    })

    describe('setEditRyoteiMode', () => {
      it('should set mode to "editRyotei"', () => {
        const { result } = renderHook(() => useFormState())

        const mockPlan: Plan = {
          id: 'test-id',
          datetime: '2024-12-25T14:30:00',
          description: 'Test plan',
          trip_id: 'trip-1',
        }

        act(() => {
          result.current.setEditRyoteiMode(mockPlan)
        })

        expect(result.current.mode).toBe('editRyotei')
      })

      it('should set selectedPlan with provided plan', () => {
        const { result } = renderHook(() => useFormState())

        const mockPlan: Plan = {
          id: 'test-id',
          datetime: '2024-12-25T14:30:00',
          description: 'Test plan',
          trip_id: 'trip-1',
        }

        act(() => {
          result.current.setEditRyoteiMode(mockPlan)
        })

        expect(result.current.selectedPlan).toEqual(mockPlan)
      })
    })

    describe('setDeleteRyoteiMode', () => {
      it('should set mode to "deleteRyotei"', () => {
        const { result } = renderHook(() => useFormState())

        const mockPlan: Plan = {
          id: 'test-id',
          datetime: '2024-12-25T14:30:00',
          description: 'Test plan',
          trip_id: 'trip-1',
        }

        act(() => {
          result.current.setDeleteRyoteiMode(mockPlan)
        })

        expect(result.current.mode).toBe('deleteRyotei')
      })

      it('should set selectedPlan with provided plan', () => {
        const { result } = renderHook(() => useFormState())

        const mockPlan: Plan = {
          id: 'test-id',
          datetime: '2024-12-25T14:30:00',
          description: 'Test plan',
          trip_id: 'trip-1',
        }

        act(() => {
          result.current.setDeleteRyoteiMode(mockPlan)
        })

        expect(result.current.selectedPlan).toEqual(mockPlan)
      })
    })
  })

  describe('Trip mode setters', () => {
    describe('setAddTripMode', () => {
      it('should set mode to "addTrip"', () => {
        const { result } = renderHook(() => useFormState())

        act(() => {
          result.current.setAddTripMode()
        })

        expect(result.current.mode).toBe('addTrip')
      })

      it('should set trip to null', () => {
        const { result } = renderHook(() => useFormState())

        const mockTrip: TripsInsertInput = {
          name: 'Test Trip',
          user_id: 'user-1',
        }

        // First set a trip
        act(() => {
          result.current.setEditTripMode(mockTrip)
        })

        expect(result.current.trip).not.toBeNull()

        // Then call setAddTripMode
        act(() => {
          result.current.setAddTripMode()
        })

        expect(result.current.trip).toBeNull()
      })
    })

    describe('setEditTripMode', () => {
      it('should set mode to "editTrip"', () => {
        const { result } = renderHook(() => useFormState())

        const mockTrip: TripsInsertInput = {
          name: 'Test Trip',
          user_id: 'user-1',
        }

        act(() => {
          result.current.setEditTripMode(mockTrip)
        })

        expect(result.current.mode).toBe('editTrip')
      })

      it('should set trip with provided data', () => {
        const { result } = renderHook(() => useFormState())

        const mockTrip: TripsInsertInput = {
          name: 'Test Trip',
          user_id: 'user-1',
        }

        act(() => {
          result.current.setEditTripMode(mockTrip)
        })

        expect(result.current.trip).toEqual(mockTrip)
      })
    })

    describe('setDeleteTripMode', () => {
      it('should set mode to "deleteTrip"', () => {
        const { result } = renderHook(() => useFormState())

        const mockTrip: TripsInsertInput = {
          name: 'Test Trip',
          user_id: 'user-1',
        }

        act(() => {
          result.current.setDeleteTripMode(mockTrip)
        })

        expect(result.current.mode).toBe('deleteTrip')
      })

      it('should set trip with provided data', () => {
        const { result } = renderHook(() => useFormState())

        const mockTrip: TripsInsertInput = {
          name: 'Test Trip',
          user_id: 'user-1',
        }

        act(() => {
          result.current.setDeleteTripMode(mockTrip)
        })

        expect(result.current.trip).toEqual(mockTrip)
      })
    })

    describe('setShareTripMode', () => {
      it('should set mode to "shareTrip"', () => {
        const { result } = renderHook(() => useFormState())

        const mockShareData: ShareInsertInput = {
          trip_id: 'trip-1',
          share_id: 'share-123',
        }

        act(() => {
          result.current.setShareTripMode(mockShareData)
        })

        expect(result.current.mode).toBe('shareTrip')
      })

      it('should set trip with provided share data', () => {
        const { result } = renderHook(() => useFormState())

        const mockShareData: ShareInsertInput = {
          trip_id: 'trip-1',
          share_id: 'share-123',
        }

        act(() => {
          result.current.setShareTripMode(mockShareData)
        })

        expect(result.current.trip).toEqual(mockShareData)
      })
    })

    describe('setSwitchTripStatusMode', () => {
      it('should set mode to "switchTripStatus"', () => {
        const { result } = renderHook(() => useFormState())

        const mockShareData: ShareInsertInput = {
          trip_id: 'trip-1',
          share_id: 'share-123',
        }

        act(() => {
          result.current.setSwitchTripStatusMode(mockShareData)
        })

        expect(result.current.mode).toBe('switchTripStatus')
      })

      it('should set switchTripStatusData with provided share data', () => {
        const { result } = renderHook(() => useFormState())

        const mockShareData: ShareInsertInput = {
          trip_id: 'trip-1',
          share_id: 'share-123',
        }

        act(() => {
          result.current.setSwitchTripStatusMode(mockShareData)
        })

        expect(result.current.switchTripStatusData).toEqual(mockShareData)
      })
    })
  })

  describe('resetMode', () => {
    it('should reset mode to null', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.setAddRyoteiMode()
      })

      expect(result.current.mode).toBe('addRyotei')

      act(() => {
        result.current.resetMode()
      })

      expect(result.current.mode).toBeNull()
    })

    it('should reset selectedPlan to null', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.setEditRyoteiMode(mockPlan)
      })

      expect(result.current.selectedPlan).toEqual(mockPlan)

      act(() => {
        result.current.resetMode()
      })

      expect(result.current.selectedPlan).toBeNull()
    })

    it('should reset trip to null', () => {
      const { result } = renderHook(() => useFormState())

      const mockTrip: TripsInsertInput = {
        name: 'Test Trip',
        user_id: 'user-1',
      }

      act(() => {
        result.current.setEditTripMode(mockTrip)
      })

      expect(result.current.trip).toEqual(mockTrip)

      act(() => {
        result.current.resetMode()
      })

      expect(result.current.trip).toBeNull()
    })

    it('should reset all state at once', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.setEditRyoteiMode(mockPlan)
      })

      act(() => {
        result.current.resetMode()
      })

      expect(result.current.mode).toBeNull()
      expect(result.current.selectedPlan).toBeNull()
      expect(result.current.trip).toBeNull()
    })
  })

  describe('onMenuClick', () => {
    it('should call setEditRyoteiMode when action is "editRyotei"', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.onMenuClick('editRyotei', mockPlan)
      })

      expect(result.current.mode).toBe('editRyotei')
      expect(result.current.selectedPlan).toEqual(mockPlan)
    })

    it('should call setDeleteRyoteiMode when action is "deleteRyotei"', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.onMenuClick('deleteRyotei', mockPlan)
      })

      expect(result.current.mode).toBe('deleteRyotei')
      expect(result.current.selectedPlan).toEqual(mockPlan)
    })
  })

  describe('State transitions', () => {
    it('should handle switching between different Ryotei modes', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.setAddRyoteiMode()
      })
      expect(result.current.mode).toBe('addRyotei')

      act(() => {
        result.current.setEditRyoteiMode(mockPlan)
      })
      expect(result.current.mode).toBe('editRyotei')

      act(() => {
        result.current.setDeleteRyoteiMode(mockPlan)
      })
      expect(result.current.mode).toBe('deleteRyotei')
    })

    it('should handle switching between different Trip modes', () => {
      const { result } = renderHook(() => useFormState())

      const mockTrip: TripsInsertInput = {
        name: 'Test Trip',
        user_id: 'user-1',
      }

      const mockShareData: ShareInsertInput = {
        trip_id: 'trip-1',
        share_id: 'share-123',
      }

      act(() => {
        result.current.setAddTripMode()
      })
      expect(result.current.mode).toBe('addTrip')

      act(() => {
        result.current.setEditTripMode(mockTrip)
      })
      expect(result.current.mode).toBe('editTrip')

      act(() => {
        result.current.setDeleteTripMode(mockTrip)
      })
      expect(result.current.mode).toBe('deleteTrip')

      act(() => {
        result.current.setShareTripMode(mockShareData)
      })
      expect(result.current.mode).toBe('shareTrip')

      act(() => {
        result.current.setSwitchTripStatusMode(mockShareData)
      })
      expect(result.current.mode).toBe('switchTripStatus')
    })

    it('should handle switching between Ryotei and Trip modes', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      const mockTrip: TripsInsertInput = {
        name: 'Test Trip',
        user_id: 'user-1',
      }

      act(() => {
        result.current.setEditRyoteiMode(mockPlan)
      })
      expect(result.current.mode).toBe('editRyotei')
      expect(result.current.selectedPlan).toEqual(mockPlan)

      act(() => {
        result.current.setEditTripMode(mockTrip)
      })
      expect(result.current.mode).toBe('editTrip')
      expect(result.current.trip).toEqual(mockTrip)
    })

    it('should handle complex state transitions with reset', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.setEditRyoteiMode(mockPlan)
      })
      expect(result.current.mode).toBe('editRyotei')

      act(() => {
        result.current.resetMode()
      })
      expect(result.current.mode).toBeNull()
      expect(result.current.selectedPlan).toBeNull()

      act(() => {
        result.current.setAddRyoteiMode()
      })
      expect(result.current.mode).toBe('addRyotei')
      expect(result.current.selectedPlan).toBeNull()
    })
  })

  describe('setSelectedPlan', () => {
    it('should allow manual setting of selectedPlan', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'manual-id',
        datetime: '2024-12-31T10:00:00',
        description: 'Manual plan',
        trip_id: 'trip-2',
      }

      act(() => {
        result.current.setSelectedPlan(mockPlan)
      })

      expect(result.current.selectedPlan).toEqual(mockPlan)
    })

    it('should allow setting selectedPlan to null', () => {
      const { result } = renderHook(() => useFormState())

      const mockPlan: Plan = {
        id: 'test-id',
        datetime: '2024-12-25T14:30:00',
        description: 'Test plan',
        trip_id: 'trip-1',
      }

      act(() => {
        result.current.setEditRyoteiMode(mockPlan)
      })

      expect(result.current.selectedPlan).toEqual(mockPlan)

      act(() => {
        result.current.setSelectedPlan(null)
      })

      expect(result.current.selectedPlan).toBeNull()
    })
  })
})
