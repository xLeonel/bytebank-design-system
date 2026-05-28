import './bb-new-transaction-modal';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/New Transaction Modal',
  component: 'bb-new-transaction-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

export const Open: Story = {
  args: { open: true },
  render: ({ open }) => `<bb-new-transaction-modal ${open ? 'open' : ''}></bb-new-transaction-modal>`,
};

export const Closed: Story = {
  args: { open: false },
  render: ({ open }) => `
<div>
  <p>O modal está fechado. Ative o controle "open" para visualizá-lo.</p>
  <bb-new-transaction-modal ${open ? 'open' : ''}></bb-new-transaction-modal>
</div>`,
};
