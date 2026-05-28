import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../styles/globals.css';

/**
 * @element bb-badge
 *
 * A small component for displaying labels or status
 *
 * @example
 * <bb-badge variant="success" label="Ativo"></bb-badge>
 */
@customElement('bb-badge')
export class BbBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }

    :host([variant="success"]) .badge {
      background: var(--bb-success, #47A138);
      color: white;
    }

    :host([variant="warning"]) .badge {
      background: var(--bb-warning, #f59e0b);
      color: white;
    }

    :host([variant="error"]) .badge {
      background: var(--bb-error, #D8353A);
      color: white;
    }

    :host([variant="info"]) .badge {
      background: var(--bb-secondary, #3F38A1);
      color: white;
    }
  `;

  @property({ reflect: true })
  variant: 'success' | 'warning' | 'error' | 'info' = 'info';

  @property()
  label = 'Badge';

  render() {
    return html`
      <span class="badge">
        <slot>${this.label}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bb-badge': BbBadge;
  }
}
