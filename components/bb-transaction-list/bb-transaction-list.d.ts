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
    /** Título exibido no estado vazio (nenhuma transação). */
    emptyTitle: string;
    /** Descrição exibida no estado vazio (nenhuma transação). */
    emptyDescription: string;
    static styles: import('lit').CSSResult;
    private selectItem;
    private handleItemKey;
    private renderItem;
    private renderGrouped;
    private renderEmpty;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-transaction-list': BbTransactionList;
    }
}
