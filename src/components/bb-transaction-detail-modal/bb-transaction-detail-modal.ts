import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../bb-modal/bb-modal';
import { TRANSACTION_CATEGORIES } from '../bb-new-transaction-list/bb-new-transaction-list';

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
  /** Categoria da transação (editável no modal). */
  category?: string;
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
  @state() private editedCategory = '';
  /** Novos arquivos anexados nesta edição (ainda não persistidos). */
  @state() private newFiles: File[] = [];
  /** Anexo aberto no lightbox (null = fechado). Imagem abre <img>, PDF abre <iframe>. */
  @state() private enlarged: { url: string; type: string } | null = null;

  /** Seed editable state whenever a new transaction is loaded. */
  protected updated(changed: PropertyValues) {
    if (changed.has('transaction') && this.transaction) {
      this.editedDescription = this.transaction.description ?? '';
      this.editedAmount = formatBrl.format(Math.abs(this.transaction.amount));
      this.editedDate = toInputDate(this.transaction.date);
      this.editedCategory = this.transaction.category ?? '';
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
      this.editedCategory !== (this.transaction.category ?? '') ||
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

    input,
    select {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      padding: 0.85rem 1rem;
      font-size: 1rem;
      font-family: inherit;
      background: white;
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
      background: var(--bb-success, #2E7D32);
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

    button.thumb.thumb-pdf {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.15rem;
      color: var(--bb-error, #D8353A);
      font-size: 0.65rem;
      font-weight: 700;
    }

    button.thumb.thumb-pdf svg {
      width: 26px;
      height: 26px;
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

    button.file-trigger:hover {
      background: #f3f4f6;
    }

    .file-hint {
      font-size: 0.85rem;
      color: #6b7280;
      overflow: hidden;
      text-overflow: ellipsis;
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

    .lightbox-pdf {
      width: 90vw;
      height: 90vh;
      border: none;
      border-radius: 0.5rem;
      background: white;
    }

    button.lightbox-close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border: none;
      border-radius: 999px;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
    }

    button.lightbox-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleDescriptionInput(e: Event) {
    this.editedDescription = (e.target as HTMLInputElement).value;
  }

  private handleCategoryInput(e: Event) {
    this.editedCategory = (e.target as HTMLSelectElement).value;
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
    // Apenas um comprovante (o novo substitui o anterior selecionado).
    if (input.files && input.files[0]) this.newFiles = [input.files[0]];
    input.value = '';
  }

  private removeNewFile(index: number) {
    this.newFiles = this.newFiles.filter((_, i) => i !== index);
  }

  private enlarge(url: string, type: string) {
    // Para PDF, converte a data URL em blob URL (iframe exibe PDF com mais
    // confiabilidade a partir de blob: do que de data:).
    if (type.includes('pdf') && url.startsWith('data:')) {
      try {
        const [meta, b64] = url.split(',');
        const mime = (meta.match(/data:(.*?);base64/) || [])[1] || 'application/pdf';
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const blobUrl = URL.createObjectURL(new Blob([bytes], { type: mime }));
        this.enlarged = { url: blobUrl, type };
        return;
      } catch {
        // fallback: usa a data URL diretamente
      }
    }
    this.enlarged = { url, type };
  }

  private closeEnlarge() {
    if (this.enlarged?.url.startsWith('blob:')) {
      URL.revokeObjectURL(this.enlarged.url);
    }
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
          category: this.editedCategory,
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
    const existing = (this.transaction?.attachments ?? [])[0];
    const newFile = this.newFiles[0];
    const selected = Boolean(newFile || existing);
    const selectedName = newFile ? newFile.name : existing ? existing.name : '';
    return html`
      <div class="field">
        <span class="field-label">Comprovante (opcional)</span>
        ${existing && !newFile
          ? html`
              <div class="attachments">
                ${existing.type.startsWith('image/')
                  ? html`
                      <button type="button" class="thumb" title=${existing.name} @click=${() => this.enlarge(existing.url, existing.type)}>
                        <img src=${existing.url} alt=${existing.name} />
                      </button>
                    `
                  : existing.type.includes('pdf')
                    ? html`
                        <button type="button" class="thumb thumb-pdf" title=${existing.name} @click=${() => this.enlarge(existing.url, existing.type)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                          </svg>
                          PDF
                        </button>
                      `
                    : html`<a class="file-link" href=${existing.url} target="_blank" rel="noopener">${existing.name}</a>`}
              </div>
            `
          : ''}
        <div class="file-field">
          <button type="button" class="file-trigger" @click=${this.triggerFileInput}>
            ${selected ? 'Substituir comprovante' : 'Escolher arquivo'}
          </button>
          <span class="file-hint">${selected ? selectedName : 'Nenhum comprovante selecionado'}</span>
        </div>
        <input id="bb-edit-attachments" type="file" accept="image/*,.pdf" hidden @change=${this.handleFilesInput} />
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

          <label>
            Categoria (opcional)
            <select .value=${this.editedCategory} @change=${this.handleCategoryInput}>
              <option value="">Selecione a categoria</option>
              ${TRANSACTION_CATEGORIES.map((c) => html`<option value=${c}>${c}</option>`)}
            </select>
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
              <button type="button" class="lightbox-close" @click=${this.closeEnlarge} aria-label="Fechar">
                ✕
              </button>
              ${this.enlarged.type.includes('pdf')
                ? html`<iframe
                    class="lightbox-pdf"
                    src=${this.enlarged.url}
                    title="Comprovante em PDF"
                    @click=${(e: Event) => e.stopPropagation()}
                  ></iframe>`
                : html`<img
                    src=${this.enlarged.url}
                    alt="Comprovante ampliado"
                    @click=${(e: Event) => e.stopPropagation()}
                  />`}
            </div>
          `
        : ''}
    `;
  }
}
