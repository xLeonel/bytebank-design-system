import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TransactionItem = {
  id: string;
  type: string;
  amount: number;
  description?: string;
  date: string;
};

const formatBrl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

@customElement('bb-transaction-list')
export class BbTransactionList extends LitElement {
  @property({ type: Array, attribute: false })
  items: TransactionItem[] = [];

  @property({ type: Boolean, attribute: 'show-dividers', reflect: true })
  showDividers = false;

  @property({ type: Boolean, attribute: 'show-description', reflect: true })
  showDescription = false;

  static styles = css`
    :host {
      display: block;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      font-size: 0.95rem;
      padding-bottom: 0.75rem;
    }

    .divider {
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .meta {
      color: #6b7280;
      font-size: 0.8rem;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
    }

    button {
      background: none;
      border: none;
      color: #2563eb;
      font-size: 0.85rem;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
    }

    button.icon {
      text-decoration: none;
      display: inline-flex;
      padding: 0;
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

  render() {
    return html`
      <div class="list">
        ${this.items.map(
          (item) => html`
            <div class="item ${this.showDividers ? 'divider' : ''}">
              <div class="row">
                <div>
                  <div class="font-semibold">${item.type}</div>
                  <div class="font-semibold">${formatBrl.format(item.amount)}</div>
                  ${this.showDescription && item.description
                    ? html`<div class="meta">${item.description}</div>`
                    : html``}
                </div>
                <div class="meta">${item.date}</div>
              </div>
              <div class="actions">
                <button @click=${() => this.selectItem(item)} type="button">Detalhar transação</button>
                <button class="icon" @click=${() => this.selectItem(item)} type="button">›</button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}
