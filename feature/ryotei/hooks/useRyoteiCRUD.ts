import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { MUTATION_ADD_RYOTEI, MUTATION_DELETE_RYOTEI, MUTATION_UPDATE_RYOTEI } from '@/feature/ryotei/graphql'
import {
  InsertIntoryoteiCollectionMutation as AddRyoteiMutation,
  InsertIntoryoteiCollectionMutationVariables as AddRyoteiMutationVariables,
  UpdateryoteiCollectionMutation as UpdateRyoteiMutation,
  UpdateryoteiCollectionMutationVariables as UpdateRyoteiMutationVariables,
  DeleteRyoteiByIdMutation as DeleteRyoteiMutation,
  DeleteRyoteiByIdMutationVariables as DeleteRyoteiMutationVariables,
  RyoteiInsertInput,
} from '@/feature/api/graphql'
import { SnackbarDispatchContext } from '@/feature/provider/SnackbarContextProvider'
import { useContext } from 'react'

export const useRyoteiCRUD = (selectedTripId?: string, refetch?: () => void) => {
  const dispatch = useContext(SnackbarDispatchContext)
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
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  const updateRyoteiById = async (id: any, data: RyoteiInsertInput) => {
    try {
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
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  const deleteRyoteiById = async (id: any) => {
    try {
      await deleteRyotei({
        variables: { ryoteiId: id },
      })
      await refetch?.()
    } catch (e) {
      if (e instanceof Error)
        dispatch?.({
          message: e.message,
          open: true,
          ContentProps: { sx: { backgroundColor: 'tomato' } },
        })
    }
  }

  useEffect(() => void (redirectReq && redirect('/login')), [redirectReq])

  return {
    createRyotei,
    updateRyoteiById,
    deleteRyoteiById,
  }
}
