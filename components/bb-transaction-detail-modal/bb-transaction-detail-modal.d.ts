import { LitElement, PropertyValues } from 'lit';
export type TransactionDetail = {
    id: string;
    type: string;
    description?: string;
    amount: number;
    date: string;
};
export declare class BbTransactionDetailModal extends LitElement {
    open: boolean;
    transaction: TransactionDetail | null;
    ariaLabel: string;
    /** Mirrors the editable fields so we can track changes reactively. */
    private editedType;
    private editedDescription;
    /** Seed editable state whenever a new transaction is loaded. */
    protected updated(changed: PropertyValues): void;
    private get hasChanges();
    private get isFormValid();
    static styles: import('lit').CSSResult;
    private close;
    private handleTypeInput;
    private handleDescriptionInput;
    private handleSave;
    private handleDelete;
    render(): import('lit-html').TemplateResult<1>;
}
