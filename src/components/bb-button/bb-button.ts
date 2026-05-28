import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../styles/globals.css';

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
      --button-bg: var(--bb-primary, #374C34);
      --button-color: white;
      --button-padding: 0.75rem var(--bb-space-md); /* 12px 16px → md */
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

    :host([variant="secondary"]) button {
      background: transparent;
      color: var(--bb-secondary, #3F38A1);
      border: 1px solid var(--bb-secondary, #3F38A1);
      box-shadow: none;
    }

    :host([variant="secondary"]) button:hover {
      background: rgba(63, 56, 161, 0.06);
      box-shadow: none;
    }

    :host([variant="danger"]) {
      --button-bg: var(--bb-error, #D8353A);
    }

    :host([variant="success"]) {
      --button-bg: var(--bb-success, #47A138);
    }

    :host([size="sm"]) {
      --button-padding: var(--bb-space-sm) var(--bb-space-md); /* 8px 16px */
      font-size: var(--bb-font-size-sm);
    }

    :host([size="lg"]) {
      --button-padding: var(--bb-space-md) var(--bb-space-lg); /* 16px 24px */
      font-size: var(--bb-font-size-lg);
    }

    :host([full-width]) button {
      width: 100%;
    }

    /* Disabled — deve ficar por último para ganhar todos os variants */
    :host([disabled]) button,
    :host([disabled]) button:hover {
      background: #e5e7eb;
      color: #9ca3af;
      border: none;
      box-shadow: none;
      cursor: not-allowed;
      transform: none;
      opacity: 1;
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
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Full width button */
  @property({ attribute: 'full-width', reflect: true })
  fullWidth = false;

  render() {
    return html`
      <button ?disabled="${this.disabled}" class="bb-button">
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
