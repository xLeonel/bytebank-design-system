import { LitElement } from 'lit';
export declare class BbNewTransactionModal extends LitElement {
    open: boolean;
    ariaLabel: string;
    private type;
    private amount;
    private date;
    private agency;
    private account;
    private pixKey;
    private isPix;
    static styles: import('lit').CSSResult;
    firstUpdated(): void;
    private handleTypeChange;
    /** Format a raw digit string (centavos) as BRL currency. */
    private formatCurrency;
    private handleAmountChange;
    private handleDateChange;
    /**
     * Agência mask: XXXX-X  (4 digits + 1 check digit, e.g. "0001-5")
     * Accepts at most 5 digits; inserts dash before the last one.
     */
    private formatAgency;
    /**
     * Conta mask: XXXXXXX-X  (up to 7 digits + 1 check digit, e.g. "1234567-8")
     * The dash always separates the last (check) digit.
     */
    private formatAccount;
    private handlePixKeyInput;
    private handleAgencyInput;
    private handleAccountInput;
    private get isFormValid();
    private resetForm;
    private close;
    private submitForm;
    render(): import('lit-html').TemplateResult<1>;
}
