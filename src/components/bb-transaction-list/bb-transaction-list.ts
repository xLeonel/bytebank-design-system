import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TransactionItem = {
  id: string;
  type: string;
  amount: number;
  description?: string;
  category?: string;
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

  /** Exibe skeleton (shimmer) enquanto as transações carregam. */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Quantidade de linhas do skeleton. */
  @property({ type: Number, attribute: 'skeleton-rows' })
  skeletonRows = 5;

  /** Título exibido no estado vazio (nenhuma transação). */
  @property({ type: String, attribute: 'empty-title' })
  emptyTitle = 'Nenhuma transação por aqui ainda';

  /** Descrição exibida no estado vazio (nenhuma transação). */
  @property({ type: String, attribute: 'empty-description' })
  emptyDescription = 'Cadastre uma transação para começar a acompanhar suas finanças.';

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
      padding: 0.75rem 0.5rem;
      margin: 0 -0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .item:hover {
      background: #f9fafb;
    }

    .item:focus-visible {
      outline: 2px solid var(--bb-primary, #374C34);
      outline-offset: -2px;
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
      color: var(--bb-success, #2E7D32);
    }

    .amount.negative {
      color: var(--bb-error, #D8353A);
    }

    .description {
      color: #6b7280;
      font-size: 0.8rem;
    }

    .meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.35rem;
      flex-shrink: 0;
    }

    .date {
      color: #6b7280;
      font-size: 0.8rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .category-tag {
      display: inline-block;
      background: #eef3ec;
      color: var(--bb-primary, #374C34);
      border: 1px solid rgba(55, 76, 52, 0.15);
      border-radius: 999px;
      padding: 0.1rem 0.55rem;
      font-size: 0.7rem;
      font-weight: 600;
      white-space: nowrap;
    }

    /* ── Skeleton (loading) ───────────────────────── */
    .sk-item {
      padding: 0.85rem 0.5rem;
      margin: 0 -0.5rem;
    }
    .sk-item + .sk-item {
      border-top: 1px solid #e5e7eb;
    }
    .sk-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    .sk-line {
      height: 0.7rem;
      border-radius: 0.375rem;
      background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
      background-size: 400% 100%;
      animation: bb-shimmer 1.4s ease infinite;
    }
    .sk-col { display: flex; flex-direction: column; gap: 0.5rem; }
    @keyframes bb-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sk-line { animation: none; }
    }

    /* ── Actions ──────────────────────────────────── */
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .edit-hint {
      color: var(--bb-primary, #374C34);
      font-size: 0.85rem;
      text-decoration: underline;
    }

    .item .icon {
      color: var(--bb-primary, #374C34);
      font-size: 1rem;
    }

    /* ── Empty state ──────────────────────────────── */
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 0.5rem;
      padding: 2.5rem 1rem;
    }

    .empty svg {
      width: 40px;
      height: 40px;
      color: var(--bb-primary, #374C34);
      opacity: 0.55;
      margin-bottom: 0.25rem;
    }

    .empty-title {
      font-weight: 700;
      font-size: 1rem;
      color: var(--bb-dark, #332E2B);
    }

    .empty-description {
      font-size: 0.85rem;
      color: #6b7280;
      max-width: 22rem;
      line-height: 1.4;
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

  private handleItemKey(e: KeyboardEvent, item: TransactionItem) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.selectItem(item);
    }
  }

  private renderItem(item: TransactionItem) {
    const amountClass = item.amount < 0 ? 'negative' : 'positive';
    return html`
      <div
        class="item"
        role="button"
        tabindex="0"
        aria-label=${`Editar transação: ${item.type}`}
        @click=${() => this.selectItem(item)}
        @keydown=${(e: KeyboardEvent) => this.handleItemKey(e, item)}
      >
        <div class="row">
          <div class="info">
            <span class="type">${item.type}</span>
            <span class="amount ${amountClass}">${formatBrl.format(item.amount)}</span>
            ${item.description ? html`<span class="description">${item.description}</span>` : ''}
          </div>
          <div class="meta">
            <span class="date">${formatDateLong(item.date)}</span>
            ${item.category ? html`<span class="category-tag">${item.category}</span>` : ''}
          </div>
        </div>
        <div class="actions">
          <span class="edit-hint">Editar transação</span>
          <span class="icon" aria-hidden="true">›</span>
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

  private renderSkeleton() {
    const rows = Array.from({ length: Math.max(1, this.skeletonRows) });
    return html`
      <div class="list" aria-busy="true" aria-label="Carregando transações">
        ${rows.map(
          () => html`
            <div class="sk-item">
              <div class="sk-row">
                <div class="sk-col" style="flex:1">
                  <span class="sk-line" style="width:35%"></span>
                  <span class="sk-line" style="width:22%"></span>
                  <span class="sk-line" style="width:55%"></span>
                </div>
                <div class="sk-col" style="align-items:flex-end">
                  <span class="sk-line" style="width:90px"></span>
                  <span class="sk-line" style="width:60px"></span>
                </div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h3" />
        </svg>
        <span class="empty-title">${this.emptyTitle}</span>
        <span class="empty-description">${this.emptyDescription}</span>
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return this.renderSkeleton();
    }
    if (!this.items || this.items.length === 0) {
      return this.renderEmpty();
    }
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
