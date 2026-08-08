import { LitElement } from 'lit';
export declare class BbModal extends LitElement {
    open: boolean;
    title: string;
    size: 'sm' | 'md' | 'lg';
    ariaLabel: string;
    static styles: import('lit').CSSResult;
    handleClose(): void;
    handleBackdropClick(event: Event): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-modal': BbModal;
    }
}
