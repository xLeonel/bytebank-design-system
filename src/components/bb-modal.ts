import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bb-modal')
export class BbModal extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = 'Modal dialog';

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);
      z-index: 1000;
    }

    .panel {
      background: white;
      border-radius: 1rem;
      width: min(100%, 34rem);
      max-height: min(100vh, 90vh);
      overflow: auto;
      padding: 2rem;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
      position: relative;
    }

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: #4b5563;
      cursor: pointer;
      font-size: 1.25rem;
    }
  `;

  handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  handleBackdropClick(event: Event) {
    if (event.target === this.shadowRoot?.querySelector('.backdrop')) {
      this.handleClose();
    }
  }

  render() {
    if (!this.open) {
      return html``;
    }

    return html`
      <div class="backdrop" @click=${this.handleBackdropClick}>
        <div class="panel" role="dialog" aria-modal="true" aria-label=${this.ariaLabel} @click=${(e: Event) => e.stopPropagation()}>
          <button type="button" class="close" @click=${this.handleClose} aria-label="Fechar">×</button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
