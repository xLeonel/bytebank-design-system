import './bb-sidebar';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SidebarItem } from './bb-sidebar';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: 'bb-sidebar',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

const defaultItems: SidebarItem[] = [
  { href: '/dashboard', label: 'Início' },
  { href: '/extrato', label: 'Extrato' },
  { href: '/investimentos', label: 'Investimentos' },
  { href: '/cartoes', label: 'Cartões' },
  { href: '/servicos', label: 'Serviços' },
];

export const Default: Story = {
  render: () => {
    const el = document.createElement('bb-sidebar') as any;
    el.items = defaultItems;
    return el;
  },
};

export const WithActiveItem: Story = {
  render: () => {
    const el = document.createElement('bb-sidebar') as any;
    el.items = defaultItems;
    // simula item ativo manualmente
    el.style.setProperty('--active-href', '/extrato');
    return el;
  },
};

export const FewItems: Story = {
  render: () => {
    const el = document.createElement('bb-sidebar') as any;
    el.items = [
      { href: '/dashboard', label: 'Início' },
      { href: '/extrato', label: 'Extrato' },
    ];
    return el;
  },
};
