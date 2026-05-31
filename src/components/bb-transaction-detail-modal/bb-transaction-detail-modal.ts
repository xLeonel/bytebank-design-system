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

/** "DD/MM/YYYY" → "YYYY-MM-DD" for <input type="date"> */
function toInputDate(display: string): string {
  const [d, m, y] = display.split('/');
  return y && m && d ? `${y}-${m}-${d}` : '';
}

/** "YYYY-MM-DD" → "DD/MM/YYYY" for storage */
function toDisplayDate(input: string): string {
  const [y, m, d] = input.split('-');
  return y && m && d ? `${d}/${m}/${y}` : input;
}

@customElement('bb-transaction-detail-modal')
export class BbTransactionDetailModal extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object, attribute: false })
  transaction: TransactionDetail | null = null;

  @property({ type: String })
  ariaLabel = 'Editar transação';

  /** Mirrors the editable fields so we can track changes reactively. */
  @state() private editedDescription = '';
  @state() private editedAmount = '';
  @state() private editedDate = '';

  /** Seed editable state whenever a new transaction is loaded. */
  protected updated(changed: PropertyValues) {
    if (changed.has('transaction') && this.transaction) {
      this.editedDescription = this.transaction.description ?? '';
      this.editedAmount = formatBrl.format(Math.abs(this.transaction.amount));
      this.editedDate = toInputDate(this.transaction.date);
    }
  }

  private get hasChanges(): boolean {
    if (!this.transaction) return false;
    const originalAmount = formatBrl.format(Math.abs(this.transaction.amount));
    const originalDate = toInputDate(this.transaction.date);
    return (
      this.editedDescription !== (this.transaction.description ?? '') ||
      this.editedAmount !== originalAmount ||
      this.editedDate !== originalDate
    );
  }

  private get isFormValid(): boolean {
    const digits = this.editedAmount.replace(/\D/g, '');
    const parsed = digits ? parseInt(digits, 10) / 100 : 0;
    return parsed > 0 && this.editedDate.length > 0;
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

    input:disabled {
      background: #f3f4f6;
      color: #6b7280;
      cursor: not-allowed;
      border-color: #e5e7eb;
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

  private handleDescriptionInput(e: Event) {
    this.editedDescription = (e.target as HTMLInputElement).value;
  }

  private handleAmountInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    const formatted = digits
      ? formatBrl.format(parseInt(digits, 10) / 100)
      : '';
    this.editedAmount = formatted;
    input.value = formatted;
  }

  private handleDateInput(e: Event) {
    this.editedDate = (e.target as HTMLInputElement).value;
  }

  private handleSave(event: Event) {
    event.preventDefault();
    if (!this.transaction || !this.hasChanges || !this.isFormValid) return;
    const digits = this.editedAmount.replace(/\D/g, '');
    const parsed = parseInt(digits, 10) / 100;
    // Preserve the original sign (Saque/Transferência Pix stay negative)
    const amount = Math.sign(this.transaction.amount || -1) === -1
      ? -Math.abs(parsed)
      : Math.abs(parsed);
    this.dispatchEvent(
      new CustomEvent('save', {
        detail: {
          id: this.transaction.id,
          description: this.editedDescription,
          amount,
          date: toDisplayDate(this.editedDate),
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
            Tipo de transação
            <input type="text" disabled .value=${this.transaction.type} />
          </label>

          <label>
            Descrição (opcional)
            <input id="description" type="text" .value=${this.editedDescription} @input=${this.handleDescriptionInput} placeholder="Digite a descrição da transação" />
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
            <input type="text" inputmode="numeric" .value=${this.editedAmount} @input=${this.handleAmountInput} />
          </label>

          <label>
            Data Operação
            <input type="date" .value=${this.editedDate} @input=${this.handleDateInput} />
          </label>

          <button type="submit" ?disabled=${!this.hasChanges || !this.isFormValid}>Salvar alterações</button>
          <button class="delete" type="button" @click=${this.handleDelete}>Excluir transação</button>
        </form>
      </bb-modal>
    `;
  }
}
