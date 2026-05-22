import '../components/bb-field';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Field',
  component: 'bb-field',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome',
  },
  render: ({ label, placeholder }) => `
<bb-field label="${label}">
  <input placeholder="${placeholder}" />
</bb-field>`,
};
