import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../styles/globals.css';

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
@customElement('bb-button')
export class BbButton extends LitElement {
  static styles = css`
    :host {
      --button-bg: var(--bb-primary, #1f2937);
      --button-color: white;
      --button-padding: 0.5rem 1rem;
      --button-radius: var(--bb-radius, 0.5rem);
      --button-shadow: var(--bb-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
    }

    button {
      background-color: var(--button-bg);
      color: var(--button-color);
      padding: var(--button-padding);
      border: none;
      border-radius: var(--button-radius);
      cursor: pointer;
      font-weight: 500;
      font-size: inherit;
      box-shadow: var(--button-shadow);
      transition: all 0.2s ease;
      font-family: inherit;
    }

    button:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    button:active {
      transform: translateY(0);
      opacity: 0.8;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Variant styles */
    :host([variant="secondary"]) {
      --button-bg: #e5e7eb;
      --button-color: #1f2937;
    }

    :host([variant="danger"]) {
      --button-bg: #ef4444;
    }

    :host([variant="success"]) {
      --button-bg: #10b981;
    }

    /* Size styles */
    :host([size="sm"]) {
      --button-padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
    }

    :host([size="lg"]) {
      --button-padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    /* Full width */
    :host([full-width]) button {
      width: 100%;
    }
  `;

  constructor() {
    super();
  }

  /** Button label text */
  @property()
  label = 'Button';

  /** Button variant style */
  @property({ reflect: true })
  variant: ButtonVariant = 'primary';

  /** Button size */
  @property({ reflect: true })
  size: ButtonSize = 'md';

  /** Disabled state */
  @property({ reflect: true })
  disabled = false;

  /** Full width button */
  @property({ attribute: 'full-width', reflect: true })
  fullWidth = false;

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        class="bb-button"
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bb-button': BbButton;
  }
}
