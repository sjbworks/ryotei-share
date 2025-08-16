import { useState } from 'react'
import { Plan } from '@/component/Timeline/TimelineItem'
import { ActionType } from '@/feature/ryotei/types'
import { RyoteiInsertInput, TripsInsertInput } from '@/feature/api/graphql'

export const useFormState = () => {
  const [mode, setMode] = useState<ActionType | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<RyoteiInsertInput | null>(null)
  const [trip, setTrip] = useState<TripsInsertInput | null>(null)

  const setEditMode = (plan: Plan) => {
    setMode('edit')
    setSelectedPlan(plan)
  }

  const setDeleteMode = (plan: Plan) => {
    setMode('delete')
    setSelectedPlan(plan)
  }

  const setAddTripMode = () => {
    setMode('addEditTrip')
    setTrip(null)
  }

  const setEditTripMode = (tripData: TripsInsertInput) => {
    setMode('addEditTrip')
    setTrip(tripData)
  }

  const setDeleteTripMode = (tripData: TripsInsertInput) => {
    setMode('deleteTrip')
    setTrip(tripData)
  }

  const resetMode = () => {
    setMode(null)
    setSelectedPlan(null)
    setTrip(null)
  }

  const onMenuClick = (action: ActionType, plan: Plan) => {
    if (action === 'edit') {
      setEditMode(plan)
    } else if (action === 'delete') {
      setDeleteMode(plan)
    }
  }

  return {
    mode,
    selectedPlan,
    trip,
    setEditMode,
    setDeleteMode,
    setAddTripMode,
    setEditTripMode,
    setDeleteTripMode,
    resetMode,
    onMenuClick,
    setSelectedPlan,
  }
}
