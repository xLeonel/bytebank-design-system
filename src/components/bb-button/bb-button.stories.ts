import './bb-button';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Button',
  component: 'bb-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

const render = ({ label, variant, size, disabled }: Record<string, string>) =>
  `<bb-button label="${label}" variant="${variant}"${size ? ` size="${size}"` : ''}${disabled ? ' disabled' : ''}></bb-button>`;

export const Primary: Story = {
  args: { label: 'Enviar', variant: 'primary' },
  render,
};

export const Secondary: Story = {
  args: { label: 'Cancelar', variant: 'secondary' },
  render,
};

export const Danger: Story = {
  args: { label: 'Excluir', variant: 'danger' },
  render,
};

export const Success: Story = {
  args: { label: 'Confirmar', variant: 'success' },
  render,
};

export const Disabled: Story = {
  args: { label: 'Indisponível', variant: 'primary', disabled: true },
  render,
};

export const Small: Story = {
  args: { label: 'Pequeno', variant: 'primary', size: 'sm' },
  render,
};

export const Large: Story = {
  args: { label: 'Grande', variant: 'primary', size: 'lg' },
  render,
};
