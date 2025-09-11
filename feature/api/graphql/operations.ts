import * as Types from './schema'

export type InsertIntoryoteiCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.RyoteiInsertInput> | Types.RyoteiInsertInput
}>

export type InsertIntoryoteiCollectionMutation = {
  __typename?: 'Mutation'
  insertIntoryoteiCollection?: { __typename?: 'ryoteiInsertResponse'; affectedCount: number } | null
}

export type InsertIntoshare_SettingCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.Share_SettingInsertInput> | Types.Share_SettingInsertInput
}>

export type InsertIntoshare_SettingCollectionMutation = {
  __typename?: 'Mutation'
  insertIntoshare_settingCollection?: {
    __typename?: 'share_settingInsertResponse'
    affectedCount: number
    records: Array<{ __typename?: 'share_setting'; id: any; share_id: string; trip_id: any }>
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

export type DeleteFromryoteiCollectionMutationVariables = Types.Exact<{
  filter: Types.RyoteiFilter
}>

export type DeleteFromryoteiCollectionMutation = {
  __typename?: 'Mutation'
  deleteFromryoteiCollection: { __typename?: 'ryoteiDeleteResponse'; affectedCount: number }
}

export type DeleteFromryoteiCollectionByTripIdMutationVariables = Types.Exact<{
  filter: Types.RyoteiFilter
  atMost: Types.Scalars['Int']['input']
}>

export type DeleteFromryoteiCollectionByTripIdMutation = {
  __typename?: 'Mutation'
  deleteFromryoteiCollection: {
    __typename?: 'ryoteiDeleteResponse'
    affectedCount: number
    records: Array<{ __typename?: 'ryotei'; id: any; trip_id?: any | null }>
  }
}

export type DeleteFromtripsCollectionMutationVariables = Types.Exact<{
  filter: Types.TripsFilter
  atMost: Types.Scalars['Int']['input']
}>

export type DeleteFromtripsCollectionMutation = {
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
      node: { __typename?: 'ryotei'; id: any; description: string; datetime: any; trip_id?: any | null }
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
