import { BottomSheet as BottomSheetComponent } from '../index'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof BottomSheetComponent> = {
  component: BottomSheetComponent,
  title: 'BottomSheet',
}

export default meta
type Story = StoryObj<typeof BottomSheetComponent>

export const BottomSheet: Story = {
  render: function Comp(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>bottom sheet</button>
        <BottomSheetComponent {...args} open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
          aaaa
        </BottomSheetComponent>
      </>
    )
  },
}
