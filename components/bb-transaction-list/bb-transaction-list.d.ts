import { LitElement } from 'lit';
export type TransactionItem = {
    id: string;
    type: string;
    amount: number;
    description?: string;
    date: string;
};
export declare class BbTransactionList extends LitElement {
    items: TransactionItem[];
    /** Group items by month, showing a primary-colored month header */
    groupByMonth: boolean;
    static styles: import('lit').CSSResult;
    private selectItem;
    private renderItem;
    private renderGrouped;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-transaction-list': BbTransactionList;
    }
}
