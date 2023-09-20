import { BottomSheet as BottomSheetComponent } from '../index'
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps, useState } from 'react'

type Props = ComponentProps<typeof BottomSheetComponent>

const meta: Meta<typeof BottomSheetComponent> = {
  component: BottomSheetComponent,
  title: 'BottomSheet',
}

export default meta
type Story = StoryObj<typeof BottomSheetComponent>

const useTimelineStory = () => {
  const [open, setOpen] = useState(false)
  return {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  }
}
export const Timeline: Story = {
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

// export const Timeline = {
//   ...story,
//   args: {
//     items: [{ ...Unchecked.args }],
//   },
// }
