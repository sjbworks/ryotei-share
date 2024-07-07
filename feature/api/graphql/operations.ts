import * as Types from './schema';

export type GetRyoteiQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<Array<Types.RyoteiOrderBy> | Types.RyoteiOrderBy>;
}>;


export type GetRyoteiQuery = { __typename?: 'Query', ryoteiCollection?: { __typename?: 'ryoteiConnection', edges: Array<{ __typename?: 'ryoteiEdge', node: { __typename?: 'ryotei', id: any, description: string, datetime: any } }> } | null };
