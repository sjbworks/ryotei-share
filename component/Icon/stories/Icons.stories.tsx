import { AccessTimeIcon, AddIcon, MoreHorizIcon, EditIcon, DeleteIcon } from '../index'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta = {
  title: 'Icons',
}
export default meta
type Story = StoryObj

export const Icons: Story = {
  render: () => (
    <>
      <AccessTimeIcon />
      <AddIcon />
      <MoreHorizIcon />
      <EditIcon />
      <DeleteIcon />
    </>
  ),
}
