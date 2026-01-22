import type { Meta, StoryObj } from '@storybook/react';
import PlusButton from './plus-button';

const meta = {
  title: 'Components/PlusButton',
  component: PlusButton,
} satisfies Meta<typeof PlusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
