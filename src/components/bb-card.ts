import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../styles/globals.css';

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
      box-shadow: var(--bb-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      overflow: hidden;
    }

    .card {
      height: 100%;
    }

    .header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .content {
      padding: 1.5rem;
    }

    .footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
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

  @property({ type: String, reflect: true })
  size: CardSize = 'md';

  @property({ type: String })
  title = '';

  render() {
    return html`
      <div class="card">
        ${this.title ? html`<div class="header"><slot name="header">${this.title}</slot></div>` : ''}
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
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
