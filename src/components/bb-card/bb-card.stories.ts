import './bb-card';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Card',
  component: 'bb-card',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type CardArgs = {
  title: string;
  content: string;
  size: string;
};

type Story = StoryObj<CardArgs>;

const render = ({ title, content, size }: CardArgs) => `
<bb-card title="${title}" size="${size}">
  <p>${content}</p>
</bb-card>`;

export const Default: Story = {
  args: {
    title: 'Cabeçalho do card',
    content: 'Conteúdo do card para demonstrar o layout do componente.',
    size: 'md',
  },
  render,
};

export const Small: Story = {
  args: {
    title: 'Card pequeno',
    content: 'Conteúdo compacto.',
    size: 'sm',
  },
  render,
};

export const Large: Story = {
  args: {
    title: 'Card grande',
    content: 'Conteúdo com mais espaço interno para destacar informações.',
    size: 'lg',
  },
  render,
};
