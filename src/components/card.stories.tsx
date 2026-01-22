import type { Meta, StoryObj } from '@storybook/react';
import Card from './card';
import BackButton from './back-button';
import ForwardButton from './forward-button';

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    title: 'To Do',
  },
};

export const WithContent: Story = {
  args: {
    title: 'To Do',
  },
  render: (args) => (
    <Card {...args}>
      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-2">
        <BackButton disabled />
        <span className="flex-1 text-center text-lg">Mow The lawn</span>
        <ForwardButton />
      </div>
    </Card>
  ),
};
