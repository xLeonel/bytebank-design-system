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
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--bb-dark, #332E2B);
    }

    .label {
      font-weight: 700;
    }

    /* A borda fica no wrapper (Shadow DOM) — imune ao reset do Tailwind */
    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid var(--bb-primary, #374C34);
      border-radius: 0.5rem;
      background: white;
      transition: box-shadow 0.2s ease;
      overflow: hidden;
    }

    .input-wrapper:focus-within {
      box-shadow: 0 0 0 3px rgba(55, 76, 52, 0.2);
    }

    /* Input sem borda própria — o wrapper já cuida disso.
       !important necessário: Tailwind Preflight reseta padding:0 em inputs
       no light DOM e ganha sobre ::slotted sem !important. */
    ::slotted(input),
    ::slotted(select),
    ::slotted(textarea) {
      width: 100%;
      border: none !important;
      outline: none !important;
      padding: 0.75rem 1rem !important;
      font-size: 0.9375rem;
      font-family: inherit;
      background: transparent;
      color: var(--bb-dark, #332E2B);
    }
  `;

  render() {
    return html`
      <label>
        ${this.hideLabel ? html`` : html`<span class="label">${this.label}</span>`}
        <div class="input-wrapper">
          <slot></slot>
        </div>
      </label>
    `;
  }
}
