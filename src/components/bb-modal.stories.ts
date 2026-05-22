import '../components/bb-modal';
import '../components/bb-modal-header';
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
<bb-modal ${open ? 'open' : ''} aria-label="${ariaLabel}">
  <bb-modal-header title="Modal de exemplo"></bb-modal-header>
  <p>Conteúdo do modal com título, texto e botão de fechar.</p>
</bb-modal>`,
};
