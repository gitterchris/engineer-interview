import type { Meta, StoryObj } from '@storybook/react';
import Item from './item';
import BackButton from './back-button';
import ForwardButton from './forward-button';

const meta = {
  title: 'Components/Item',
  component: Item,
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item>
      <BackButton disabled />
      <span className="flex-1 text-center text-lg">Mow The lawn</span>
      <ForwardButton />
    </Item>
  ),
};
