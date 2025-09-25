import { useState } from 'react'
import { Plan } from '@/component/Timeline/TimelineItem'
import { ActionType } from '@/feature/ryotei/types'
import { RyoteiInsertInput, TripsInsertInput, ShareInsertInput } from '@/feature/api/graphql'

export const useFormState = () => {
  const [mode, setMode] = useState<ActionType | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<RyoteiInsertInput | null>(null)
  const [trip, setTrip] = useState<TripsInsertInput | null>(null)
  const [switchTripStatusData, setSwitchTripStatusData] = useState<ShareInsertInput | null>(null)

  const setAddRyoteiMode = () => {
    setMode('addRyotei')
    setSelectedPlan(null)
  }

  const setEditRyoteiMode = (plan: Plan) => {
    setMode('editRyotei')
    setSelectedPlan(plan)
  }

  const setDeleteRyoteiMode = (plan: Plan) => {
    setMode('deleteRyotei')
    setSelectedPlan(plan)
  }

  const setAddTripMode = () => {
    setMode('addTrip')
    setTrip(null)
  }

  const setEditTripMode = (tripData: TripsInsertInput) => {
    setMode('editTrip')
    setTrip(tripData)
  }

  const setDeleteTripMode = (tripData: TripsInsertInput) => {
    setMode('deleteTrip')
    setTrip(tripData)
  }

  const setShareTripMode = (shareData: ShareInsertInput) => {
    setMode('shareTrip')
    setTrip(shareData)
  }

  const setSwitchTripStatusMode = (shareData: ShareInsertInput) => {
    setMode('switchTripStatus')
    setSwitchTripStatusData(shareData)
  }

  const resetMode = () => {
    setMode(null)
    setSelectedPlan(null)
    setTrip(null)
  }

  const onMenuClick = (action: ActionType, plan: Plan) => {
    if (action === 'editRyotei') {
      setEditRyoteiMode(plan)
    } else if (action === 'deleteRyotei') {
      setDeleteRyoteiMode(plan)
    }
  }

  return {
    mode,
    selectedPlan,
    trip,
    switchTripStatusData,
    setAddRyoteiMode,
    setEditRyoteiMode,
    setDeleteRyoteiMode,
    setAddTripMode,
    setEditTripMode,
    setDeleteTripMode,
    resetMode,
    onMenuClick,
    setSelectedPlan,
    setShareTripMode,
    setSwitchTripStatusMode,
  }
}
