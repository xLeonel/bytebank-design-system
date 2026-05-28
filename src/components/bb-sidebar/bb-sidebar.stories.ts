import './bb-sidebar';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SidebarItem } from './bb-sidebar';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: 'bb-sidebar',
  tags: ['autodocs'],
  argTypes: {
    'current-path': { control: 'text', description: 'Active route path' },
  },
};

export default meta;

type Story = StoryObj;

const defaultItems: SidebarItem[] = [
  { href: '/home',         label: 'Início' },
  { href: '/extrato',      label: 'Extrato' },
  { href: '/investimentos', label: 'Investimentos' },
  { href: '/cartoes',      label: 'Cartões' },
  { href: '/servicos',     label: 'Serviços' },
];

function makeSidebar(currentPath?: string, items = defaultItems) {
  const el = document.createElement('bb-sidebar') as any;
  el.items = items;
  if (currentPath) el.currentPath = currentPath;
  return el;
}

/** No item active (path doesn't match any href) */
export const Default: Story = {
  render: () => makeSidebar(),
};

/** First item active — simulates "/home" route */
export const ActiveHome: Story = {
  name: 'Active — Início',
  render: () => makeSidebar('/home'),
};

/** Second item active — simulates "/extrato" route */
export const ActiveExtrato: Story = {
  name: 'Active — Extrato',
  render: () => makeSidebar('/extrato'),
};

/** Minimal two-item sidebar */
export const FewItems: Story = {
  render: () => makeSidebar('/home', [
    { href: '/home',    label: 'Início' },
    { href: '/extrato', label: 'Extrato' },
  ]),
};
