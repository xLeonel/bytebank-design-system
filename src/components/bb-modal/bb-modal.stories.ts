import './bb-modal';
import type { Meta, StoryObj } from '@storybook/web-components';

type ModalArgs = {
  open: boolean;
  'aria-label': string;
};

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  component: 'bb-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    'aria-label': { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ModalArgs>;

export const Open: Story = {
  args: {
    open: true,
    'aria-label': 'Modal de demonstração',
  },
  render: ({ open, 'aria-label': ariaLabel }) => `
<bb-modal title="Modal de exemplo" ${open ? 'open' : ''} aria-label="${ariaLabel}">
  <p>Conteúdo do modal com título e botão de fechar no header.</p>
</bb-modal>`,
};

export const Closed: Story = {
  args: {
    open: false,
    'aria-label': 'Modal fechado',
  },
  render: ({ open, 'aria-label': ariaLabel }) => `
<div>
  <p>O modal está fechado. Ative o controle "open" para visualizá-lo.</p>
  <bb-modal title="Modal fechado" ${open ? 'open' : ''} aria-label="${ariaLabel}">
    <p>Conteúdo do modal.</p>
  </bb-modal>
</div>`,
};
