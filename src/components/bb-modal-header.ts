import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bb-modal-header')
export class BbModalHeader extends LitElement {
  @property({ type: String })
  title = '';

  static styles = css`
    :host {
      display: block;
      text-align: center;
      margin-bottom: 1rem;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 5rem;
      color: #6b7280;
    }

    h2 {
      font-size: 1.125rem;
      margin: 1rem 0 0;
      color: #111827;
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <h2>${this.title}</h2>
    `;
  }
}
