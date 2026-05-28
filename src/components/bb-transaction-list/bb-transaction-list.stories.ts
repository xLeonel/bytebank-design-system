import './bb-transaction-list';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { TransactionItem } from './bb-transaction-list';

const meta: Meta = {
  title: 'Components/Transaction List',
  component: 'bb-transaction-list',
  tags: ['autodocs'],
  argTypes: {
    groupByMonth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

const sampleItems: TransactionItem[] = [
  // Maio 2026
  { id: '1', type: 'Depósito', amount: 1500, description: 'Salário mensal', date: '01/05/2026' },
  { id: '2', type: 'Pix', amount: -250, description: 'Transferência para João', date: '03/05/2026' },
  { id: '3', type: 'Saque', amount: -100, date: '05/05/2026' },
  { id: '4', type: 'Depósito', amount: 300, description: 'Freelance', date: '10/05/2026' },
  // Abril 2026
  { id: '5', type: 'Depósito', amount: 2000, description: 'Salário mensal', date: '01/04/2026' },
  { id: '6', type: 'Pix', amount: -500, description: 'Aluguel', date: '05/04/2026' },
  { id: '7', type: 'Saque', amount: -80, date: '15/04/2026' },
];

/** Lista plana com divisores entre cada item */
export const Default: Story = {
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    return el;
  },
};

/** Agrupado por mês — header em verde primary acima de cada grupo */
export const GroupedByMonth: Story = {
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    el.setAttribute('group-by-month', '');
    return el;
  },
};
