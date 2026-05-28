import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TransactionItem = {
  id: string;
  type: string;
  amount: number;
  description?: string;
  date: string; // DD/MM/YYYY
};

const formatBrl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function formatDateLong(dateStr: string): string {
  const date = parseDate(dateStr);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getMonthKey(dateStr: string): string {
  const [, month, year] = dateStr.split('/').map(Number);
  return `${year}-${String(month).padStart(2, '0')}`;
}

function getMonthLabel(dateStr: string): string {
  const date = parseDate(dateStr);
  const label = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

@customElement('bb-transaction-list')
export class BbTransactionList extends LitElement {
  @property({ type: Array, attribute: false })
  items: TransactionItem[] = [];

  /** Group items by month, showing a primary-colored month header */
  @property({ type: Boolean, attribute: 'group-by-month', reflect: true })
  groupByMonth = false;

  static styles = css`
    :host {
      display: block;
    }

    /* ── Month header ─────────────────────────────── */
    .month-group:first-child .month-header {
      padding-top: 0;
    }

    .month-header {
      color: var(--bb-primary, #374C34);
      font-weight: 700;
      font-size: 1rem;
      padding: 1.25rem 0 0.25rem;
    }

    /* ── Item ─────────────────────────────────────── */
    .item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem 0;
    }

    /* Divider always on — border-top on every item that follows another item.
       Works both in flat list and inside .month-group */
    .item + .item {
      border-top: 1px solid #e5e7eb;
    }

    /* ── Row: left info + right date ──────────────── */
    .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .type {
      font-size: 0.95rem;
      color: var(--bb-dark, #332E2B);
    }

    .amount {
      font-weight: 700;
      font-size: 0.95rem;
    }

    .amount.positive {
      color: var(--bb-success, #47A138);
    }

    .amount.negative {
      color: var(--bb-error, #D8353A);
    }

    .description {
      color: #6b7280;
      font-size: 0.8rem;
    }

    .date {
      color: #6b7280;
      font-size: 0.8rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Actions ──────────────────────────────────── */
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    button {
      background: none;
      border: none;
      color: var(--bb-primary, #374C34);
      font-size: 0.85rem;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
    }

    button.icon {
      text-decoration: none;
      font-size: 1rem;
    }
  `;

  private selectItem(item: TransactionItem) {
    this.dispatchEvent(
      new CustomEvent('transaction-select', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderItem(item: TransactionItem) {
    const amountClass = item.amount < 0 ? 'negative' : 'positive';
    return html`
      <div class="item">
        <div class="row">
          <div class="info">
            <span class="type">${item.type}</span>
            <span class="amount ${amountClass}">${formatBrl.format(item.amount)}</span>
            ${item.description ? html`<span class="description">${item.description}</span>` : ''}
          </div>
          <span class="date">${formatDateLong(item.date)}</span>
        </div>
        <div class="actions">
          <button @click=${() => this.selectItem(item)} type="button">Detalhar transação</button>
          <button class="icon" @click=${() => this.selectItem(item)} type="button">›</button>
        </div>
      </div>
    `;
  }

  private renderGrouped() {
    const grouped = new Map<string, { label: string; items: TransactionItem[] }>();

    for (const item of this.items) {
      const key = getMonthKey(item.date);
      if (!grouped.has(key)) {
        grouped.set(key, { label: getMonthLabel(item.date), items: [] });
      }
      grouped.get(key)!.items.push(item);
    }

    return html`
      ${[...grouped.entries()].map(
        ([, group]) => html`
          <div class="month-group">
            <div class="month-header">${group.label}</div>
            ${group.items.map((item) => this.renderItem(item))}
          </div>
        `
      )}
    `;
  }

  render() {
    return html`
      <div class="list">
        ${this.groupByMonth
          ? this.renderGrouped()
          : this.items.map((item) => this.renderItem(item))}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bb-transaction-list': BbTransactionList;
  }
}
