import * as Types from './schema'

export type InsertIntoryoteiCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.RyoteiInsertInput> | Types.RyoteiInsertInput
}>

export type InsertIntoryoteiCollectionMutation = {
  __typename?: 'Mutation'
  insertIntoryoteiCollection?: { __typename?: 'ryoteiInsertResponse'; affectedCount: number } | null
}

export type InsertIntoshareCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.ShareInsertInput> | Types.ShareInsertInput
}>

export type InsertIntoshareCollectionMutation = {
  __typename?: 'Mutation'
  insertIntoshareCollection?: {
    __typename?: 'shareInsertResponse'
    affectedCount: number
    records: Array<{ __typename?: 'share'; id: any; share_id?: any | null; trip_id?: any | null }>
  } | null
}

export type InsertIntotripsCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.TripsInsertInput> | Types.TripsInsertInput
}>

export type InsertIntotripsCollectionMutation = {
  __typename?: 'Mutation'
  insertIntotripsCollection?: {
    __typename?: 'tripsInsertResponse'
    affectedCount: number
    records: Array<{ __typename?: 'trips'; id: any; name?: string | null }>
  } | null
}

export type DeleteRyoteiByIdMutationVariables = Types.Exact<{
  ryoteiId: Types.Scalars['UUID']['input']
}>

export type DeleteRyoteiByIdMutation = {
  __typename?: 'Mutation'
  deleteFromryoteiCollection: { __typename?: 'ryoteiDeleteResponse'; affectedCount: number }
}

export type DeleteRyoteiByTripIdMutationVariables = Types.Exact<{
  tripId: Types.Scalars['UUID']['input']
  atMost: Types.Scalars['Int']['input']
}>

export type DeleteRyoteiByTripIdMutation = {
  __typename?: 'Mutation'
  deleteFromryoteiCollection: {
    __typename?: 'ryoteiDeleteResponse'
    affectedCount: number
    records: Array<{ __typename?: 'ryotei'; id: any; trip_id: any }>
  }
}

export type DeleteShareByTripIdMutationVariables = Types.Exact<{
  tripId: Types.Scalars['UUID']['input']
  atMost: Types.Scalars['Int']['input']
}>

export type DeleteShareByTripIdMutation = {
  __typename?: 'Mutation'
  deleteFromshareCollection: {
    __typename?: 'shareDeleteResponse'
    affectedCount: number
    records: Array<{ __typename?: 'share'; id: any; trip_id?: any | null; share_id?: any | null }>
  }
}

export type DeleteTripByIdMutationVariables = Types.Exact<{
  tripId: Types.Scalars['UUID']['input']
  atMost: Types.Scalars['Int']['input']
}>

export type DeleteTripByIdMutation = {
  __typename?: 'Mutation'
  deleteFromtripsCollection: {
    __typename?: 'tripsDeleteResponse'
    affectedCount: number
    records: Array<{ __typename?: 'trips'; id: any; name?: string | null }>
  }
}

export type GetRyoteiQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<Array<Types.RyoteiOrderBy> | Types.RyoteiOrderBy>
  filter?: Types.InputMaybe<Types.RyoteiFilter>
}>

export type GetRyoteiQuery = {
  __typename?: 'Query'
  ryoteiCollection?: {
    __typename?: 'ryoteiConnection'
    edges: Array<{
      __typename?: 'ryoteiEdge'
      node: { __typename?: 'ryotei'; id: any; description: string; datetime: any; trip_id: any }
    }>
  } | null
}

export type GetShareByTripIdQueryVariables = Types.Exact<{
  tripId: Types.Scalars['UUID']['input']
}>

export type GetShareByTripIdQuery = {
  __typename?: 'Query'
  shareCollection?: {
    __typename?: 'shareConnection'
    edges: Array<{
      __typename?: 'shareEdge'
      node: {
        __typename?: 'share'
        share_id?: any | null
        trip_id?: any | null
        is_public?: boolean | null
        created_at: any
        user_id?: any | null
      }
    }>
  } | null
}

export type GetTripsQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<Array<Types.TripsOrderBy> | Types.TripsOrderBy>
}>

export type GetTripsQuery = {
  __typename?: 'Query'
  tripsCollection?: {
    __typename?: 'tripsConnection'
    edges: Array<{
      __typename?: 'tripsEdge'
      node: { __typename?: 'trips'; created_at: any; id: any; name?: string | null }
    }>
  } | null
}

export type UpdateryoteiCollectionMutationVariables = Types.Exact<{
  set: Types.RyoteiUpdateInput
  filter?: Types.InputMaybe<Types.RyoteiFilter>
}>

export type UpdateryoteiCollectionMutation = {
  __typename?: 'Mutation'
  updateryoteiCollection: { __typename?: 'ryoteiUpdateResponse'; affectedCount: number }
}

export type UpdateshareCollectionMutationVariables = Types.Exact<{
  objects: Types.ShareUpdateInput
  filter: Types.ShareFilter
}>

export type UpdateshareCollectionMutation = {
  __typename?: 'Mutation'
  updateshareCollection: {
    __typename?: 'shareUpdateResponse'
    affectedCount: number
    records: Array<{ __typename?: 'share'; id: any; share_id?: any | null; trip_id?: any | null }>
  }
}

export type UpdatetripsCollectionMutationVariables = Types.Exact<{
  set: Types.TripsUpdateInput
  filter: Types.TripsFilter
}>

export type UpdatetripsCollectionMutation = {
  __typename?: 'Mutation'
  updatetripsCollection: {
    __typename?: 'tripsUpdateResponse'
    affectedCount: number
    records: Array<{ __typename?: 'trips'; id: any; name?: string | null }>
  }
}
