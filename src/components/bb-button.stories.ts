import '../components/bb-button';
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
  },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Enviar',
    variant: 'primary',
  },
  render: ({ label, variant }) => `<bb-button label="${label}" variant="${variant}"></bb-button>`,
};

export const Secondary: Story = {
  args: {
    label: 'Cancelar',
    variant: 'secondary',
  },
  render: ({ label, variant }) => `<bb-button label="${label}" variant="${variant}"></bb-button>`,
};
