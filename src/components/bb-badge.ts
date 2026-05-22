import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../styles/globals.css';

/**
 * @element bb-badge
 * 
 * A small component for displaying labels or status
 * 
 * @example
 * <bb-badge variant="success">Active</bb-badge>
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

    :host([variant="primary"]) .badge {
      background: var(--bb-primary, #1f2937);
      color: white;
    }

    :host([variant="success"]) .badge {
      background: var(--bb-success, #10b981);
      color: white;
    }

    :host([variant="warning"]) .badge {
      background: var(--bb-warning, #f59e0b);
      color: white;
    }

    :host([variant="error"]) .badge {
      background: var(--bb-error, #ef4444);
      color: white;
    }

    :host([variant="secondary"]) .badge {
      background: #e5e7eb;
      color: #1f2937;
    }
  `;

  constructor() {
    super();
  }

  @property({ type: String, reflect: true })
  variant: 'primary' | 'success' | 'warning' | 'error' | 'secondary' = 'primary';

  @property({ type: String })
  label: string = 'Badge';

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
