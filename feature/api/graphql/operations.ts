import * as Types from './schema'

export type InsertIntoryoteiCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.RyoteiInsertInput> | Types.RyoteiInsertInput
}>

export type InsertIntoryoteiCollectionMutation = {
  __typename?: 'Mutation'
  insertIntoryoteiCollection?: { __typename?: 'ryoteiInsertResponse'; affectedCount: number } | null
}

export type GetRyoteiQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<Array<Types.RyoteiOrderBy> | Types.RyoteiOrderBy>
}>

export type GetRyoteiQuery = {
  __typename?: 'Query'
  ryoteiCollection?: {
    __typename?: 'ryoteiConnection'
    edges: Array<{
      __typename?: 'ryoteiEdge'
      node: { __typename?: 'ryotei'; id: any; description: string; datetime: any }
    }>
  } | null
}
