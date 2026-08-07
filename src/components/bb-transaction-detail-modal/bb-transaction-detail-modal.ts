import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../bb-modal/bb-modal';

export type TransactionAttachment = {
  id: string;
  name: string;
  type: string;
  /** URL do anexo (data URL base64 ou objeto URL) para exibir/ampliar. */
  url: string;
};

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
  /** Anexos já salvos na transação. Exibidos como miniatura (clique amplia). */
  attachments?: TransactionAttachment[];
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
  /** Novos arquivos anexados nesta edição (ainda não persistidos). */
  @state() private newFiles: File[] = [];
  /** URL do anexo aberto no lightbox (null = fechado). */
  @state() private enlarged: string | null = null;

  /** Seed editable state whenever a new transaction is loaded. */
  protected updated(changed: PropertyValues) {
    if (changed.has('transaction') && this.transaction) {
      this.editedDescription = this.transaction.description ?? '';
      this.editedAmount = formatBrl.format(Math.abs(this.transaction.amount));
      this.editedDate = toInputDate(this.transaction.date);
      this.newFiles = [];
      this.enlarged = null;
    }
  }

  private get hasChanges(): boolean {
    if (!this.transaction) return false;
    const originalAmount = formatBrl.format(Math.abs(this.transaction.amount));
    const originalDate = toInputDate(this.transaction.date);
    return (
      this.editedDescription !== (this.transaction.description ?? '') ||
      this.editedAmount !== originalAmount ||
      this.editedDate !== originalDate ||
      this.newFiles.length > 0
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

    /* ── Anexos ───────────────────────────────────── */
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field-label {
      font-size: 0.9rem;
      color: #111827;
    }

    .attachments {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    button.thumb {
      width: 64px;
      height: 64px;
      padding: 0;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
      background: #f9fafb;
      cursor: pointer;
    }

    button.thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .file-link {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.85rem;
      color: var(--bb-primary, #374C34);
      text-decoration: none;
    }

    .muted {
      font-size: 0.85rem;
      color: #6b7280;
    }

    button.add-attach {
      width: auto;
      align-self: flex-start;
      background: white;
      color: var(--bb-primary, #374C34);
      border: 1px solid var(--bb-primary, #374C34);
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
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
    }

    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      z-index: 1000;
      cursor: zoom-out;
    }

    .lightbox img {
      max-width: 90vw;
      max-height: 90vh;
      border-radius: 0.5rem;
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

  private triggerFileInput() {
    const input = this.renderRoot.querySelector('#bb-edit-attachments') as HTMLInputElement | null;
    input?.click();
  }

  private handleFilesInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) this.newFiles = [...this.newFiles, ...Array.from(input.files)];
    input.value = '';
  }

  private removeNewFile(index: number) {
    this.newFiles = this.newFiles.filter((_, i) => i !== index);
  }

  private enlarge(url: string) {
    this.enlarged = url;
  }

  private closeEnlarge() {
    this.enlarged = null;
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
          newAttachments: this.newFiles,
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

  private renderAttachments() {
    const existing = this.transaction?.attachments ?? [];
    return html`
      <div class="field">
        <span class="field-label">Anexos</span>
        ${existing.length
          ? html`
              <div class="attachments">
                ${existing.map((att) =>
                  att.type.startsWith('image/')
                    ? html`
                        <button type="button" class="thumb" title=${att.name} @click=${() => this.enlarge(att.url)}>
                          <img src=${att.url} alt=${att.name} />
                        </button>
                      `
                    : html`<a class="file-link" href=${att.url} target="_blank" rel="noopener">${att.name}</a>`
                )}
              </div>
            `
          : html`<span class="muted">Nenhum anexo.</span>`}

        <button type="button" class="add-attach" @click=${this.triggerFileInput}>Adicionar anexo</button>
        <input id="bb-edit-attachments" type="file" multiple hidden @change=${this.handleFilesInput} />
        ${this.newFiles.length
          ? html`
              <ul class="file-list">
                ${this.newFiles.map(
                  (f, i) => html`
                    <li class="file-chip">
                      <span class="file-name">${f.name}</span>
                      <button
                        type="button"
                        class="file-remove"
                        @click=${() => this.removeNewFile(i)}
                        aria-label="Remover ${f.name}"
                      >
                        ✕
                      </button>
                    </li>
                  `
                )}
              </ul>
            `
          : ''}
      </div>
    `;
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

          ${this.renderAttachments()}

          <button type="submit" ?disabled=${!this.hasChanges || !this.isFormValid}>Salvar alterações</button>
          <button class="delete" type="button" @click=${this.handleDelete}>Excluir transação</button>
        </form>
      </bb-modal>
      ${this.enlarged
        ? html`
            <div class="lightbox" @click=${this.closeEnlarge}>
              <img src=${this.enlarged} alt="Anexo ampliado" />
            </div>
          `
        : ''}
    `;
  }
}
