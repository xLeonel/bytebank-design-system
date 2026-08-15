import { LitElement, PropertyValues } from 'lit';
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
export declare class BbTransactionDetailModal extends LitElement {
    open: boolean;
    transaction: TransactionDetail | null;
    ariaLabel: string;
    /** Mirrors the editable fields so we can track changes reactively. */
    private editedDescription;
    private editedAmount;
    private editedDate;
    private editedCategory;
    /** Novos arquivos anexados nesta edição (ainda não persistidos). */
    private newFiles;
    /** Anexo aberto no lightbox (null = fechado). Imagem abre <img>, PDF abre <iframe>. */
    private enlarged;
    /** Seed editable state whenever a new transaction is loaded. */
    protected updated(changed: PropertyValues): void;
    private get hasChanges();
    private get isFormValid();
    static styles: import('lit').CSSResult;
    private close;
    private handleDescriptionInput;
    private handleCategoryInput;
    private handleAmountInput;
    private handleDateInput;
    private triggerFileInput;
    private handleFilesInput;
    private removeNewFile;
    private enlarge;
    private closeEnlarge;
    private handleSave;
    private handleDelete;
    private renderAttachments;
    render(): import('lit-html').TemplateResult<1>;
}
