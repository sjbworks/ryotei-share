import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import {
  MUTATION_ADD_RYOTEI,
  MUTATION_DELETE_RYOTEI,
  MUTATION_UPDATE_RYOTEI,
} from '@/feature/ryotei/graphql'
import {
  InsertIntoryoteiCollectionMutation as AddRyoteiMutation,
  InsertIntoryoteiCollectionMutationVariables as AddRyoteiMutationVariables,
  UpdateryoteiCollectionMutation as UpdateRyoteiMutation,
  UpdateryoteiCollectionMutationVariables as UpdateRyoteiMutationVariables,
  DeleteFromryoteiCollectionMutation as DeleteRyoteiMutation,
  DeleteFromryoteiCollectionMutationVariables as DeleteRyoteiMutationVariables,
  RyoteiInsertInput,
} from '@/feature/api/graphql'

export const useRyoteiCRUD = (selectedTripId?: string, refetch?: () => void) => {
  const [redirectReq, setRedirectReq] = useState(false)
  
  const [addRyotei] = useMutation<AddRyoteiMutation, AddRyoteiMutationVariables>(MUTATION_ADD_RYOTEI)
  const [deleteRyotei] = useMutation<DeleteRyoteiMutation, DeleteRyoteiMutationVariables>(MUTATION_DELETE_RYOTEI)
  const [updateRyotei] = useMutation<UpdateRyoteiMutation, UpdateRyoteiMutationVariables>(MUTATION_UPDATE_RYOTEI)

  const createRyotei = async (newData: RyoteiInsertInput) => {
    try {
      const dataWithTripId: RyoteiInsertInput = {
        ...newData,
        trip_id: newData.trip_id || selectedTripId,
      }
      await addRyotei({ variables: { objects: dataWithTripId } })
      await refetch?.()
    } catch (e) {
      setRedirectReq(true)
    }
  }

  const updateRyoteiById = async (id: any, data: RyoteiInsertInput) => {
    await updateRyotei({
      variables: {
        set: {
          datetime: data?.datetime.toISOString(),
          description: data?.description,
        },
        filter: { id: { eq: id } },
      },
    })
    await refetch?.()
  }

  const deleteRyoteiById = async (id: any) => {
    await deleteRyotei({ 
      variables: { filter: { id: { eq: id } } } 
    })
    await refetch?.()
  }

  useEffect(() => void (redirectReq && redirect('/login')), [redirectReq])

  return {
    createRyotei,
    updateRyoteiById,
    deleteRyoteiById,
  }
}