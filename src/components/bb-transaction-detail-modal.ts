import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TransactionDetail = {
  id: string;
  type: string;
  description?: string;
  amount: number;
  date: string;
};

const formatBrl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

@customElement('bb-transaction-detail-modal')
export class BbTransactionDetailModal extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object, attribute: false })
  transaction: TransactionDetail | null = null;

  @property({ type: String })
  ariaLabel = 'Detalhar transação';

  static styles = css`
    :host {
      display: block;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #111827;
    }

    input {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      padding: 0.85rem 1rem;
      font-size: 1rem;
      font-family: inherit;
    }

    .buttons {
      display: flex;
      gap: 0.75rem;
    }

    button {
      border: none;
      border-radius: 0.75rem;
      padding: 0.9rem 1rem;
      font-weight: 700;
      cursor: pointer;
      color: white;
    }

    button.save {
      background: #10b981;
    }

    button.delete {
      background: #ef4444;
    }
  `;

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleSave(event: Event) {
    event.preventDefault();
    if (!this.transaction) return;
    const typeInput = this.shadowRoot?.querySelector('#type') as HTMLInputElement;
    const descriptionInput = this.shadowRoot?.querySelector('#description') as HTMLInputElement;
    if (!typeInput || !descriptionInput) return;

    this.dispatchEvent(
      new CustomEvent('save', {
        detail: {
          id: this.transaction.id,
          type: typeInput.value,
          description: descriptionInput.value,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  private handleDelete() {
    if (!this.transaction) return;
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: { id: this.transaction.id },
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  render() {
    if (!this.open || !this.transaction) {
      return html``;
    }

    return html`
      <bb-modal .open=${this.open} aria-label=${this.ariaLabel} @close=${this.close}>
        <bb-modal-header title="Detalhar transação"></bb-modal-header>
        <form @submit=${this.handleSave}>
          <label>
            Nome da transação
            <input id="type" type="text" .value=${this.transaction.type} />
          </label>

          <label>
            Descrição (opcional)
            <input id="description" type="text" .value=${this.transaction.description ?? ''} />
          </label>

          <label>
            Valor
            <input type="text" disabled .value=${formatBrl.format(Math.abs(this.transaction.amount))} />
          </label>

          <label>
            Data Operação
            <input type="text" disabled .value=${this.transaction.date} />
          </label>

          <div class="buttons">
            <button class="save" type="submit">Salvar alterações</button>
            <button class="delete" type="button" @click=${this.handleDelete}>Excluir transação</button>
          </div>
        </form>
      </bb-modal>
    `;
  }
}
