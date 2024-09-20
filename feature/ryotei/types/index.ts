import { ACTION } from '../constants/index'

export type ActionType = (typeof ACTION)[keyof typeof ACTION]
