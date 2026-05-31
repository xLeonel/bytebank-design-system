import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../bb-modal/bb-modal';

export type TransactionDetail = {
  id: string;
  type: string;
  description?: string;
  amount: number;
  date: string;
  /** Agência da conta envolvida na transação (ex: "0001-5"). Read-only no modal. */
  agency?: string;
  /** Número da conta envolvida na transação (ex: "1234567-8"). Read-only no modal. */
  account?: string;
  /** Chave Pix usada na transferência. Read-only no modal. */
  pixKey?: string;
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
  ariaLabel = 'Editar transação';

  /** Mirrors the editable fields so we can track changes reactively. */
  @state() private editedType = '';
  @state() private editedDescription = '';

  /** Seed editable state whenever a new transaction is loaded. */
  protected updated(changed: PropertyValues) {
    if (changed.has('transaction') && this.transaction) {
      this.editedType = this.transaction.type;
      this.editedDescription = this.transaction.description ?? '';
    }
  }

  private get hasChanges(): boolean {
    if (!this.transaction) return false;
    return (
      this.editedType !== this.transaction.type ||
      this.editedDescription !== (this.transaction.description ?? '')
    );
  }

  private get isFormValid(): boolean {
    return this.editedType.trim().length > 0;
  }

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

    button {
      border: none;
      border-radius: 0.75rem;
      background: var(--bb-success, #47A138);
      color: white;
      padding: 0.9rem 1rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }

    button.delete {
      background: var(--bb-error, #D8353A);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    button:disabled:hover {
      opacity: 0.4;
      transform: none;
    }
  `;

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleTypeInput(e: Event) {
    this.editedType = (e.target as HTMLInputElement).value;
  }

  private handleDescriptionInput(e: Event) {
    this.editedDescription = (e.target as HTMLInputElement).value;
  }

  private handleSave(event: Event) {
    event.preventDefault();
    if (!this.transaction || !this.hasChanges || !this.isFormValid) return;
    this.dispatchEvent(
      new CustomEvent('save', {
        detail: {
          id: this.transaction.id,
          type: this.editedType,
          description: this.editedDescription,
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
      <bb-modal title="Editar transação" .open=${this.open} aria-label=${this.ariaLabel} @close=${this.close}>
        <form @submit=${this.handleSave}>
          <label>
            Nome da transação
            <input id="type" type="text" .value=${this.editedType} @input=${this.handleTypeInput} />
          </label>

          <label>
            Descrição (opcional)
            <input id="description" type="text" .value=${this.editedDescription} @input=${this.handleDescriptionInput} />
          </label>

          ${this.transaction.type === 'Transferência Pix' ? html`
            <label>
              Chave Pix
              <input type="text" disabled .value=${this.transaction.pixKey ?? ''} />
            </label>
          ` : this.transaction.agency || this.transaction.account ? html`
            ${this.transaction.agency ? html`
              <label>
                Agência
                <input type="text" disabled .value=${this.transaction.agency} />
              </label>
            ` : ''}
            ${this.transaction.account ? html`
              <label>
                Conta
                <input type="text" disabled .value=${this.transaction.account} />
              </label>
            ` : ''}
          ` : ''}

          <label>
            Valor
            <input type="text" disabled .value=${formatBrl.format(Math.abs(this.transaction.amount))} />
          </label>

          <label>
            Data Operação
            <input type="text" disabled .value=${this.transaction.date} />
          </label>

          <button type="submit" ?disabled=${!this.hasChanges || !this.isFormValid}>Salvar alterações</button>
          <button class="delete" type="button" @click=${this.handleDelete}>Excluir transação</button>
        </form>
      </bb-modal>
    `;
  }
}
