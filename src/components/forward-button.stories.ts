import type { Meta, StoryObj } from '@storybook/react';
import ForwardButton from './forward-button';

const meta = {
  title: 'Components/ForwardButton',
  component: ForwardButton,
} satisfies Meta<typeof ForwardButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
