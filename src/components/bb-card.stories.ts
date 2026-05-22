import '../components/bb-card';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Card',
  component: 'bb-card',
  tags: ['autodocs'],
};

export default meta;

type CardArgs = {
  header: string;
  content: string;
  footer: string;
};

type Story = StoryObj<CardArgs>;

const Template = ({ header, content, footer }: CardArgs) => `
<bb-card>
  <div slot="header">${header}</div>
  <p>${content}</p>
  <div slot="footer">${footer}</div>
</bb-card>`;

export const Default: Story = {
  args: {
    header: 'Cabeçalho do card',
    content: 'Conteúdo do card para demonstrar o layout do componente.',
    footer: 'Rodapé do card',
  },
  render: Template,
};
