import { LitElement } from 'lit';
export type CardSize = 'sm' | 'md' | 'lg';
/**
 * @element bb-card
 *
 * A card component for grouping content
 *
 * @slot - Default slot for card content
 * @slot header - Header content
 * @slot footer - Footer content
 */
export declare class BbCard extends LitElement {
    static styles: import('lit').CSSResult;
    constructor();
    size: CardSize;
    title: string;
    private _hasFooter;
    private _onFooterSlotChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-card': BbCard;
    }
}
