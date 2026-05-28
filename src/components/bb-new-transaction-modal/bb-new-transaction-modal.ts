import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../bb-modal/bb-modal';

const TRANSACTION_TYPES = ['Depósito', 'Saque', 'Pix'];

@customElement('bb-new-transaction-modal')
export class BbNewTransactionModal extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  ariaLabel = 'Nova transação';

  @state()
  private type = TRANSACTION_TYPES[0];

  @state()
  private amount = '';

  @state()
  private date = '';

  @state()
  private agency = '';

  @state()
  private account = '';

  @state()
  private isPix = false;

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

    select,
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
      font-weight: 700;
      cursor: pointer;
    }

    button.secondary {
      background: var(--bb-error, #D8353A);
    }
  `;

  firstUpdated() {
    this.isPix = this.type === 'Pix';
  }

  private handleTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.type = target.value;
    this.isPix = target.value === 'Pix';
  }

  /** Format a raw digit string (centavos) as BRL currency. */
  private formatCurrency(digits: string): string {
    if (!digits) return '';
    const num = parseInt(digits, 10);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num / 100);
  }

  private handleAmountChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    const formatted = this.formatCurrency(digits);
    // Store the formatted string — submit parsing strips non-digits.
    this.amount = formatted;
    // Overwrite the input synchronously so the display stays formatted
    // and the cursor naturally sits at the end (centavos-style entry).
    input.value = formatted;
  }

  private handleDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.date = target.value;
  }

  /**
   * Agência mask: XXXX-X  (4 digits + 1 check digit, e.g. "0001-5")
   * Accepts at most 5 digits; inserts dash before the last one.
   */
  private formatAgency(digits: string): string {
    const d = digits.slice(0, 5);
    if (d.length <= 4) return d;
    return `${d.slice(0, 4)}-${d.slice(4)}`;
  }

  /**
   * Conta mask: XXXXXXX-X  (up to 7 digits + 1 check digit, e.g. "1234567-8")
   * The dash always separates the last (check) digit.
   */
  private formatAccount(digits: string): string {
    const d = digits.slice(0, 8);
    if (d.length <= 1) return d;
    return `${d.slice(0, -1)}-${d.slice(-1)}`;
  }

  private handleAgencyInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    const formatted = this.formatAgency(digits);
    this.agency = formatted;
    input.value = formatted;
  }

  private handleAccountInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    const formatted = this.formatAccount(digits);
    this.account = formatted;
    input.value = formatted;
  }

  private resetForm() {
    this.type = TRANSACTION_TYPES[0];
    this.amount = '';
    this.date = '';
    this.agency = '';
    this.account = '';
    this.isPix = false;
  }

  private close() {
    this.resetForm();
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private submitForm(event: Event) {
    event.preventDefault();
    const digits = this.amount.replace(/\D/g, '');
    const parsed = digits ? parseInt(digits, 10) / 100 : 0;
    if (!this.type || !digits || parsed === 0 || Number.isNaN(parsed) || !this.date) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: {
          type: this.type,
          amount: this.type === 'Saque' ? -Math.abs(parsed) : parsed,
          date: this.date,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  render() {
    return html`
      <bb-modal title="Nova transação" size="lg" .open=${this.open} aria-label=${this.ariaLabel} @close=${this.close}>
        <form @submit=${this.submitForm}>
          <label>
            Tipo de transação
            <select .value=${this.type} @change=${this.handleTypeChange}>
              ${TRANSACTION_TYPES.map((item) => html`<option value=${item}>${item}</option>`)}
            </select>
          </label>

          <label>
            Valor
            <input type="text" inputmode="numeric" .value=${this.amount} @input=${this.handleAmountChange} placeholder="R$ 0,00" />
          </label>

          ${this.isPix
            ? html`
                <label>
                  Chave Pix
                  <input type="text" placeholder="CPF, e-mail, telefone ou chave aleatória" />
                </label>
              `
            : html`
                <label>
                  Agência
                  <input
                    type="text"
                    inputmode="numeric"
                    .value=${this.agency}
                    @input=${this.handleAgencyInput}
                    placeholder="0000-0"
                    maxlength="6"
                  />
                </label>
                <label>
                  Conta
                  <input
                    type="text"
                    inputmode="numeric"
                    .value=${this.account}
                    @input=${this.handleAccountInput}
                    placeholder="0000000-0"
                    maxlength="9"
                  />
                </label>
              `}

          <label>
            Data
            <input type="date" .value=${this.date} @input=${this.handleDateChange} />
          </label>

          <button type="submit">Concluir transação</button>
          <button type="button" class="secondary" @click=${this.close}>Cancelar</button>
        </form>
      </bb-modal>
    `;
  }
}
