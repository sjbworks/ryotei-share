import { Drawer as DrawerComponent } from '../index'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

const meta: Meta<typeof DrawerComponent> = {
  component: DrawerComponent,
  title: 'DrawerSheet',
}

export default meta
type Story = StoryObj<typeof DrawerComponent>

export const Drawer: Story = {
  render: function Comp(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>open sheet</button>
        <DrawerComponent {...args} open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
          aaaa
        </DrawerComponent>
      </>
    )
  },
}
