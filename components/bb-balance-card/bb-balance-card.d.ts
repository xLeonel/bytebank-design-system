import { LitElement } from 'lit';
export declare class BbBalanceCard extends LitElement {
    greetingName: string;
    today: string;
    accountType: string;
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
