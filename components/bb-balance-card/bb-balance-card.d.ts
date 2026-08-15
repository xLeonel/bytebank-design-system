import { LitElement } from 'lit';
export declare class BbBalanceCard extends LitElement {
    greetingName: string;
    today: string;
    accountType: string;
    /** Agência da conta (ex.: "0001"). Exibida sob o tipo de conta quando presente. */
    agency: string;
    /** Número da conta (ex.: "12345-6"). Exibido sob o tipo de conta quando presente. */
    account: string;
    balance: number;
    private visible;
    static styles: import('lit').CSSResult;
    private toggleVisibility;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-balance-card': BbBalanceCard;
    }
}
