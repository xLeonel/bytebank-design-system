import './bb-field';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Field',
  component: 'bb-field',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hideLabel: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

const wrap = (content: string) =>
  `<div style="max-width:360px;width:100%">${content}</div>`;

export const Default: Story = {
  args: { label: 'Nome', placeholder: 'Digite seu nome' },
  render: ({ label, placeholder }) => wrap(`
<bb-field label="${label}">
  <input placeholder="${placeholder}" />
</bb-field>`),
};

export const Textarea: Story = {
  args: { label: 'Descrição', placeholder: 'Digite uma descrição...' },
  render: ({ label, placeholder }) => wrap(`
<bb-field label="${label}">
  <textarea placeholder="${placeholder}" rows="4"></textarea>
</bb-field>`),
};

export const Select: Story = {
  args: { label: 'Tipo de conta' },
  render: ({ label }) => wrap(`
<bb-field label="${label}">
  <select>
    <option>Conta Corrente</option>
    <option>Conta Poupança</option>
    <option>Conta Investimento</option>
  </select>
</bb-field>`),
};

export const HiddenLabel: Story = {
  args: { label: 'Campo oculto', placeholder: 'Label escondida' },
  render: ({ label, placeholder }) => wrap(`
<bb-field label="${label}" hide-label>
  <input placeholder="${placeholder}" />
</bb-field>`),
};
