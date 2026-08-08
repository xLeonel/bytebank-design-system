import { LitElement } from 'lit';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * @element bb-button
 *
 * A customizable button component for Bytebank Design System
 *
 * @slot - Default slot for button content
 *
 * @example
 * <bb-button label="Click me" variant="primary"></bb-button>
 */
export declare class BbButton extends LitElement {
    static styles: import('lit').CSSResult;
    constructor();
    /** Button label text */
    label: string;
    /** Button variant style */
    variant: ButtonVariant;
    /** Button size */
    size: ButtonSize;
    /** Disabled state */
    disabled: boolean;
    /** Full width button */
    fullWidth: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bb-button': BbButton;
    }
}
