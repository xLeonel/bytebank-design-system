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

  private handleAmountChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.amount = target.value;
  }

  private handleDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.date = target.value;
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private submitForm(event: Event) {
    event.preventDefault();
    const parsed = Number(this.amount.replace(/[^0-9]/g, '')) / 100;
    if (!this.type || Number.isNaN(parsed) || !this.date) {
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
            <input type="text" .value=${this.amount} @input=${this.handleAmountChange} placeholder="0,00" />
          </label>

          ${this.isPix
            ? html`
                <label>
                  Chave Pix
                  <input type="text" placeholder="Digite a chave Pix de destino" />
                </label>
              `
            : html`
                <label>
                  Agência
                  <input type="text" placeholder="Digite a agência de destino" />
                </label>
                <label>
                  Conta
                  <input type="text" placeholder="Digite a conta de destino" />
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
