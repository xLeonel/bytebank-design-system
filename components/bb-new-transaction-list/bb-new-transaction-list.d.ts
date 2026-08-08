import { LitElement } from 'lit';
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
export declare class BbNewTransactionList extends LitElement {
    private type;
    private amount;
    private date;
    private description;
    private depositType;
    private agency;
    private account;
    private pixKey;
    private isPix;
    private files;
    static styles: import('lit').CSSResult;
    private formatCurrency;
    private formatAgency;
    private formatAccount;
    private get isFormValid();
    private handleTypeChange;
    private handleDepositTypeChange;
    private handleAmountInput;
    private handleAgencyInput;
    private handleAccountInput;
    private handlePixKeyInput;
    private handleDescriptionInput;
    private handleDateChange;
    private triggerFileInput;
    private handleFilesInput;
    private removeFile;
    private resetForm;
    private submitForm;
    private handleCancel;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-new-transaction-list': BbNewTransactionList;
    }
}
