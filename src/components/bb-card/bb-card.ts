import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../../styles/globals.css';

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
@customElement('bb-card')
export class BbCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      border-radius: var(--bb-radius, 0.5rem);
      box-shadow: 0 4px 16px rgba(55, 76, 52, 0.14);
      border: 1px solid #d5dcd4;
      overflow: hidden;
    }

    .card {
      height: 100%;
    }

    .header {
      padding: 1.5rem;
      background: var(--bb-primary, #374C34);
      color: white;
      font-weight: 700;
      font-size: 1rem;
    }

    .content {
      padding: 1.5rem;
      color: var(--bb-dark, #332E2B);
    }

    .footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #d5dcd4;
      background: #f0f4ef;
      color: var(--bb-dark, #332E2B);
      font-size: 0.875rem;
    }

    :host([size="sm"]) .header,
    :host([size="sm"]) .content,
    :host([size="sm"]) .footer {
      padding: 0.75rem;
    }

    :host([size="lg"]) .header,
    :host([size="lg"]) .content,
    :host([size="lg"]) .footer {
      padding: 2rem;
    }
  `;

  constructor() {
    super();
  }

  @property({ reflect: true })
  size: CardSize = 'md';

  @property()
  title = '';

  @state()
  private _hasFooter = false;

  private _onFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    return html`
      <div class="card">
        ${this.title ? html`<div class="header"><slot name="header">${this.title}</slot></div>` : ''}
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer" style=${this._hasFooter ? '' : 'display:none'}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bb-card': BbCard;
  }
}
