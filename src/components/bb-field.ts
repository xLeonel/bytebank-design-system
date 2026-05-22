import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bb-field')
export class BbField extends LitElement {
  @property({ type: String })
  label = '';

  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: #111827;
    }

    .label {
      font-weight: 700;
    }

    ::slotted(input),
    ::slotted(select),
    ::slotted(textarea) {
      width: 100%;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: 0.9375rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s ease;
    }

    ::slotted(input:focus),
    ::slotted(select:focus),
    ::slotted(textarea:focus) {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
    }
  `;

  render() {
    return html`
      <label>
        ${this.hideLabel ? html`` : html`<span class="label">${this.label}</span>`}
        <slot></slot>
      </label>
    `;
  }
}
