import '../components/bb-balance-card';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Balance Card',
  component: 'bb-balance-card',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    greetingName: 'Ana',
    today: '22 de maio de 2026',
    accountType: 'Conta Corrente',
    balance: 4520,
  },
  render: ({ greetingName, today, accountType, balance }) => `
<bb-balance-card
  greetingName="${greetingName}"
  today="${today}"
  accountType="${accountType}"
  balance="${balance}"
></bb-balance-card>`,
};
