import { LitElement } from 'lit';
/**
 * @element bb-badge
 *
 * A small component for displaying labels or status
 *
 * @example
 * <bb-badge variant="success" label="Ativo"></bb-badge>
 */
export declare class BbBadge extends LitElement {
    static styles: import('lit').CSSResult;
    variant: 'success' | 'warning' | 'error' | 'info';
    label: string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-badge': BbBadge;
    }
}
