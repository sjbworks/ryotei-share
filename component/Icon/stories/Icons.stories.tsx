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
} from '../index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Icons',
}

export default meta
type Story = StoryObj

export const Icons: Story = {
  render: () => (
    <>
      <FoodIcon />
      <AirPlaneIcon />
      <TrainIcon />
      <TaxiIcon />
      <CarIcon />
      <WalkIcon />
      <SleepIcon />
      <MorningIcon />
      <MoonIcon />
    </>
  ),
}
