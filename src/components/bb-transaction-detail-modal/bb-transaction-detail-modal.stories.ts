import './bb-transaction-detail-modal';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { TransactionDetail } from './bb-transaction-detail-modal';

const meta: Meta = {
  title: 'Components/Transaction Detail Modal',
  component: 'bb-transaction-detail-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

const sampleTransaction: TransactionDetail = {
  id: '1',
  type: 'Depósito',
  description: 'Salário mensal',
  amount: 1500,
  date: '01/05/2026',
};

export const Open: Story = {
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = sampleTransaction;
    return el;
  },
};

export const PixTransaction: Story = {
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = {
      id: '2',
      type: 'Pix',
      description: 'Transferência para João',
      amount: -250,
      date: '03/05/2026',
    };
    return el;
  },
};

export const Closed: Story = {
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = false;
    el.transaction = sampleTransaction;
    return el;
  },
};
