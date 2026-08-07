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

/** Com anexos — miniaturas clicáveis (abre ampliado) + botão para adicionar */
export const WithAttachments: Story = {
  render: () => {
    const img = (label: string, color: string) =>
      'data:image/svg+xml;base64,' +
      btoa(
        `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="24" text-anchor="middle" dy=".3em">${label}</text></svg>`
      );
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = {
      id: '3',
      type: 'Depósito',
      description: 'Salário mensal',
      amount: 1500,
      date: '01/05/2026',
      attachments: [
        { id: 'a1', name: 'recibo.svg', type: 'image/svg+xml', url: img('Recibo', '#374C34') },
        { id: 'a2', name: 'comprovante.svg', type: 'image/svg+xml', url: img('Comprovante', '#47A138') },
      ],
    };
    return el;
  },
};
