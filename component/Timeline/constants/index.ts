import {
  FoodIcon,
  AirPlaneIcon,
  TrainIcon,
  TaxiIcon,
  CarIcon,
  WalkIcon,
  SleepIcon,
  MorningIcon,
  MoonIcon,
} from '@/component/Icon'
import { type } from 'doctrine'
export const ICON_MAP = {
  food: FoodIcon,
  airPlane: AirPlaneIcon,
  train: TrainIcon,
  taxi: TaxiIcon,
  car: CarIcon,
  walk: WalkIcon,
  sleep: SleepIcon,
  morning: MorningIcon,
  moon: MoonIcon,
} as const

export type IconKey = keyof typeof ICON_MAP
