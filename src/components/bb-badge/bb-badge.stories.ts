import './bb-badge';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'bb-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
    },
  },
};

export default meta;

type Story = StoryObj;

const render = ({ label, variant }: Record<string, string>) =>
  `<bb-badge label="${label}" variant="${variant}"></bb-badge>`;

export const Success: Story = {
  args: { label: 'Ativo', variant: 'success' },
  render,
};

export const Warning: Story = {
  args: { label: 'Atenção', variant: 'warning' },
  render,
};

export const Error: Story = {
  args: { label: 'Erro', variant: 'error' },
  render,
};

export const Info: Story = {
  args: { label: 'Info', variant: 'info' },
  render,
};
