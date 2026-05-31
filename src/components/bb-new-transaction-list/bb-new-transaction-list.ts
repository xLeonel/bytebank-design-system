import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const TRANSACTION_TYPES = ['Depósito', 'Saque', 'Transferência Pix'];

/**
 * @element bb-new-transaction-list
 *
 * Standalone new-transaction form — no modal wrapper.
 * Embed directly in a page (like bb-transaction-list) and listen to:
 *
 *   - `submit`  detail: { type, amount, date }  (amount already signed for Saque)
 *   - `cancel`  (no detail)
 */
@customElement('bb-new-transaction-list')
export class BbNewTransactionList extends LitElement {
  @state() private type = '';
  @state() private amount = '';
  @state() private date = '';
  @state() private description = '';
  @state() private depositType: 'own' | 'other' | '' = '';
  @state() private agency = '';
  @state() private account = '';
  @state() private pixKey = '';
  @state() private isPix = false;

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
      background: white;
    }

    select:focus,
    input:focus {
      outline: 2px solid var(--bb-primary, #374C34);
      outline-offset: 2px;
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
      transition: opacity 0.2s;
    }

    button:hover:not(:disabled) {
      opacity: 0.9;
    }

    button.secondary {
      background: var(--bb-error, #D8353A);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `;

  // ── formatting helpers ────────────────────────────────────────────────────

  private formatCurrency(digits: string): string {
    if (!digits) return '';
    const num = parseInt(digits, 10);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num / 100);
  }

  private formatAgency(digits: string): string {
    const d = digits.slice(0, 5);
    return d.length <= 4 ? d : `${d.slice(0, 4)}-${d.slice(4)}`;
  }

  private formatAccount(digits: string): string {
    const d = digits.slice(0, 8);
    return d.length <= 1 ? d : `${d.slice(0, -1)}-${d.slice(-1)}`;
  }

  // ── validation ────────────────────────────────────────────────────────────

  private get isFormValid(): boolean {
    const digits = this.amount.replace(/\D/g, '');
    const parsed = digits ? parseInt(digits, 10) / 100 : 0;
    if (!this.type || !digits || parsed === 0 || !this.date) return false;
    if (this.isPix) return this.pixKey.trim().length > 0;
    if (this.type === 'Depósito') {
      if (!this.depositType) return false;
      if (this.depositType === 'other') return this.agency.length > 0 && this.account.length >= 3;
      return true; // 'own' — only amount + date needed
    }
    return true; // Saque — only amount + date needed
  }

  // ── event handlers ────────────────────────────────────────────────────────

  private handleTypeChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.type = select.value;
    this.isPix = select.value === 'Transferência Pix';
    this.depositType = '';
    this.agency = '';
    this.account = '';
    this.pixKey = '';
  }

  private handleDepositTypeChange(e: Event) {
    this.depositType = (e.target as HTMLSelectElement).value as 'own' | 'other';
    this.agency = '';
    this.account = '';
  }

  private handleAmountInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    const formatted = this.formatCurrency(digits);
    this.amount = formatted;
    input.value = formatted;
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

  private handlePixKeyInput(e: Event) {
    this.pixKey = (e.target as HTMLInputElement).value;
  }

  private handleDescriptionInput(e: Event) {
    this.description = (e.target as HTMLInputElement).value;
  }

  private handleDateChange(e: Event) {
    this.date = (e.target as HTMLInputElement).value;
  }

  // ── actions ───────────────────────────────────────────────────────────────

  private resetForm() {
    this.type = '';
    this.amount = '';
    this.date = '';
    this.description = '';
    this.depositType = '';
    this.agency = '';
    this.account = '';
    this.pixKey = '';
    this.isPix = false;
  }

  private submitForm(e: Event) {
    e.preventDefault();
    if (!this.isFormValid) return;
    const digits = this.amount.replace(/\D/g, '');
    const parsed = parseInt(digits, 10) / 100;
    const isNegative =
      this.type === 'Saque' ||
      this.type === 'Transferência Pix' ||
      (this.type === 'Depósito' && this.depositType === 'other');

    const detail: Record<string, unknown> = {
      type: this.type,
      amount: isNegative ? -Math.abs(parsed) : parsed,
      date: this.date,
      description: this.description || undefined,
    };
    if (this.isPix) {
      detail.pixKey = this.pixKey;
    } else if (this.type === 'Depósito' && this.depositType === 'other') {
      detail.agency = this.agency;
      detail.account = this.account;
    }
    // Saque and Depósito-own: no ag/conta in event — parent enriches with user's own account.

    this.dispatchEvent(new CustomEvent('submit', { detail, bubbles: true, composed: true }));
    this.resetForm();
  }

  private handleCancel() {
    this.resetForm();
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
  }

  // ── render ────────────────────────────────────────────────────────────────

  render() {
    return html`
      <form @submit=${this.submitForm}>

        <label>
          Tipo de transação
          <select .value=${this.type} @change=${this.handleTypeChange}>
            <option value="" disabled>Selecione o tipo de transação</option>
            ${TRANSACTION_TYPES.map(
              (t) => html`<option value=${t}>${t}</option>`
            )}
          </select>
        </label>

        <label>
          Valor
          <input
            type="text"
            inputmode="numeric"
            .value=${this.amount}
            @input=${this.handleAmountInput}
            placeholder="R$ 0,00"
          />
        </label>

        ${this.isPix ? html`
          <label>
            Chave Pix
            <input
              type="text"
              .value=${this.pixKey}
              @input=${this.handlePixKeyInput}
              placeholder="CPF, e-mail, telefone ou chave aleatória"
            />
          </label>
        ` : this.type === 'Depósito' ? html`
          <label>
            Tipo de depósito
            <select .value=${this.depositType} @change=${this.handleDepositTypeChange}>
              <option value="" disabled>Selecione</option>
              <option value="own">Na minha conta</option>
              <option value="other">Em outra conta</option>
            </select>
          </label>
          ${this.depositType === 'other' ? html`
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
          ` : ''}
        ` : ''}`}

        <label>
          Descrição (opcional)
          <input
            type="text"
            .value=${this.description}
            @input=${this.handleDescriptionInput}
            placeholder="Ex: aluguel, freelance..."
          />
        </label>

        <label>
          Data
          <input
            type="date"
            .value=${this.date}
            @input=${this.handleDateChange}
          />
        </label>

        <button type="submit" ?disabled=${!this.isFormValid}>
          Concluir transação
        </button>
        <button type="button" class="secondary" @click=${this.handleCancel}>
          Cancelar
        </button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bb-new-transaction-list': BbNewTransactionList;
  }
}
