import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const TRANSACTION_TYPES = ['Depósito', 'Saque', 'Transferência Pix'];

/** Categorias de despesas/receitas. */
export const TRANSACTION_CATEGORIES = [
  'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação',
  'Compras', 'Serviços', 'Salário', 'Investimentos', 'Outros',
];

/** Palavras-chave -> categoria, para a sugestão automática pela descrição. */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Alimentação: ['mercado', 'supermercado', 'ifood', 'restaurante', 'lanche', 'padaria', 'food', 'cafe', 'café'],
  Transporte: ['uber', '99', 'gasolina', 'combustivel', 'combustível', 'onibus', 'ônibus', 'metro', 'metrô', 'passagem', 'estacionamento', 'pedagio', 'pedágio'],
  Moradia: ['aluguel', 'condominio', 'condomínio', 'luz', 'energia', 'agua', 'água', 'gas', 'gás', 'internet', 'iptu'],
  Lazer: ['cinema', 'netflix', 'spotify', 'show', 'viagem', 'jogo', 'game', 'streaming', 'bar', 'balada'],
  Saúde: ['farmacia', 'farmácia', 'remedio', 'remédio', 'medico', 'médico', 'consulta', 'hospital', 'dentista', 'academia'],
  Educação: ['curso', 'faculdade', 'escola', 'livro', 'mensalidade', 'fiap', 'udemy', 'alura'],
  Compras: ['amazon', 'mercado livre', 'shopping', 'loja', 'roupa', 'magalu', 'aliexpress', 'shopee'],
  Serviços: ['assinatura', 'taxa', 'tarifa', 'servico', 'serviço', 'manutencao', 'manutenção'],
  Salário: ['salario', 'salário', 'pagamento', 'holerite', 'proventos'],
  Investimentos: ['investimento', 'cdb', 'acao', 'ação', 'acoes', 'ações', 'tesouro', 'fii', 'renda fixa', 'bitcoin', 'cripto'],
};

/** Sugere uma categoria a partir da descrição ('Outros' se nada casar). */
export function suggestCategory(description: string): string {
  const text = (description ?? '').toLowerCase().trim();
  if (!text) return '';
  for (const category of TRANSACTION_CATEGORIES) {
    if ((CATEGORY_KEYWORDS[category] ?? []).some((kw) => text.includes(kw))) return category;
  }
  return 'Outros';
}

/**
 * @element bb-new-transaction-list
 *
 * Standalone new-transaction form — no modal wrapper.
 * Embed directly in a page (like bb-transaction-list) and listen to:
 *
 *   - `submit`  detail: { type, amount, date, description?, agency?, account?, pixKey?, attachments? }
 *              (amount already signed; attachments is File[] when arquivos foram anexados)
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
  @state() private files: File[] = [];
  @state() private category = '';
  /** Marca se o usuário escolheu a categoria manualmente (trava a sugestão). */
  @state() private categoryTouched = false;

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

    /* Respiro entre o formulário e os botões de ação */
    button[type='submit'] {
      margin-top: 0.75rem;
    }

    /* ── File attachments ─────────────────────────── */
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field-label {
      font-size: 0.9rem;
      color: #111827;
    }

    .file-field {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    button.file-trigger {
      width: auto;
      background: white;
      color: var(--bb-primary, #374C34);
      border: 1px solid var(--bb-primary, #374C34);
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    button.file-trigger:hover:not(:disabled) {
      background: #f3f4f6;
      opacity: 1;
    }

    .file-hint {
      font-size: 0.85rem;
      color: #6b7280;
    }

    .file-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .file-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
      color: #111827;
    }

    .file-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button.file-remove {
      width: auto;
      background: none;
      border: none;
      color: var(--bb-error, #D8353A);
      font-size: 0.9rem;
      font-weight: 700;
      padding: 0 0.25rem;
      line-height: 1;
    }

    button.file-remove:hover:not(:disabled) {
      opacity: 0.7;
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
    // Sugere a categoria automaticamente enquanto o usuário não escolher uma.
    if (!this.categoryTouched) this.category = suggestCategory(this.description);
  }

  private handleCategoryChange(e: Event) {
    this.category = (e.target as HTMLSelectElement).value;
    this.categoryTouched = true;
  }

  private handleDateChange(e: Event) {
    this.date = (e.target as HTMLInputElement).value;
  }

  private triggerFileInput() {
    const input = this.renderRoot.querySelector('#bb-attachments') as HTMLInputElement | null;
    input?.click();
  }

  private handleFilesInput(e: Event) {
    const input = e.target as HTMLInputElement;
    // Apenas um comprovante por transação.
    this.files = input.files && input.files[0] ? [input.files[0]] : [];
  }

  private removeFile(index: number) {
    this.files = this.files.filter((_, i) => i !== index);
    if (this.files.length === 0) {
      const input = this.renderRoot.querySelector('#bb-attachments') as HTMLInputElement | null;
      if (input) input.value = '';
    }
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
    this.files = [];
    this.category = '';
    this.categoryTouched = false;
    const input = this.renderRoot.querySelector('#bb-attachments') as HTMLInputElement | null;
    if (input) input.value = '';
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
    if (this.files.length) {
      detail.attachments = this.files;
    }
    if (this.category) {
      detail.category = this.category;
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
        ` : ''}

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
          Categoria (opcional)
          <select .value=${this.category} @change=${this.handleCategoryChange}>
            <option value="">Selecione a categoria</option>
            ${TRANSACTION_CATEGORIES.map(
              (c) => html`<option value=${c}>${c}</option>`
            )}
          </select>
        </label>

        <label>
          Data
          <input
            type="date"
            .value=${this.date}
            @input=${this.handleDateChange}
          />
        </label>

        <div class="field">
          <span class="field-label">Comprovante (opcional)</span>
          <div class="file-field">
            <button type="button" class="file-trigger" @click=${this.triggerFileInput}>
              ${this.files.length ? 'Substituir comprovante' : 'Escolher arquivo'}
            </button>
            <span class="file-hint">
              ${this.files.length ? this.files[0].name : 'Nenhum comprovante selecionado'}
            </span>
          </div>
          <input
            id="bb-attachments"
            type="file"
            accept="image/*,.pdf"
            hidden
            @change=${this.handleFilesInput}
          />
        </div>

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
