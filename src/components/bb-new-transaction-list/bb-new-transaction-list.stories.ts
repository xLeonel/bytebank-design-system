import './bb-new-transaction-list';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/New Transaction List',
  component: 'bb-new-transaction-list',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Formulário autônomo de nova transação — sem modal. Ideal para ser embutido
diretamente em uma página (como \`bb-transaction-list\` é em \`/extrato\`).

**Eventos despachados:**
- \`submit\` — \`detail: { type: string, amount: number, date: string }\`
  \`amount\` já vem com sinal: negativo para Saque, positivo para Depósito e Pix.
- \`cancel\` — sem detail; disparado ao clicar em "Cancelar".

**Campos dinâmicos:**
- Tipo **Pix** → exibe campo de Chave Pix.
- Tipos **Depósito** / **Saque** → exibe campos de Agência (\`XXXX-X\`) e Conta (\`XXXXXXX-X\`).

**Validação:**
O botão "Concluir transação" só é habilitado quando todos os campos obrigatórios
estão preenchidos e o valor é maior que zero.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/** Formulário em seu estado inicial — pronto para receber interação. */
export const Default: Story = {
  render: () => {
    const el = document.createElement('bb-new-transaction-list');

    el.addEventListener('submit', (e: Event) => {
      const { type, amount, date } = (e as CustomEvent).detail;
      console.log('[bb-new-transaction-list] submit →', { type, amount, date });
    });

    el.addEventListener('cancel', () => {
      console.log('[bb-new-transaction-list] cancel');
    });

    return el;
  },
};
