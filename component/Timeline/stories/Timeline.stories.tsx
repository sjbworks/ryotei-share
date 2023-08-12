import {Timeline as TimelineComponent} from "../index";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TimelineComponent> = {
    component: TimelineComponent,
    title: 'Timeline',
};

export default meta;
type Story = StoryObj<typeof TimelineComponent>;

export const Timeline: Story = {
    render: () => <TimelineComponent />,
};