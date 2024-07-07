import { createClient } from '@supabase/supabase-js'
import { gql } from '@apollo/client'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/constants/supabase'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export { default as QUERY_GET_RYOTEI } from './getRyotei.gql'

/** 旅程一覧取得用クエリー */
// export const getRyotei = gql(`
//     query GetRyotei($orderBy: [tasksOrderBy!]) {
//         ryoteiCollection(orderBy: $orderBy) {
//             edges {
//             node {
//                 id
//                 description
//                 datetime
//             }
//             }
//         }
//     }
// `)

/** 新規タスク作成用ミューテーション */
// export const taskInsert = gql(`
//     mutation TaskMutation($objects: [tasksInsertInput!]!) {
//         insertIntotasksCollection(objects: $objects) {
//             records {
//             title
//             }
//         }
//     }
// `)

/** タスクのステータス更新用ミューテーション */
// export const taskUpdate = gql(`
//     mutation Mutation($set: tasksUpdateInput!, $filter: tasksFilter) {
//         updatetasksCollection(set: $set, filter: $filter) {
//             records {
//                 is_completed
//             }
//         }
//     }
// `)
