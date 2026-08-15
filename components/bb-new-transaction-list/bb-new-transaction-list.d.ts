import { LitElement } from 'lit';
/** Categorias de despesas/receitas. */
export declare const TRANSACTION_CATEGORIES: string[];
/** Sugere uma categoria a partir da descrição ('Outros' se nada casar). */
export declare function suggestCategory(description: string): string;
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
    private category;
    /** Marca se o usuário escolheu a categoria manualmente (trava a sugestão). */
    private categoryTouched;
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
    private handleCategoryChange;
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
