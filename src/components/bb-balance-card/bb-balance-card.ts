import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const formatBrl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const iconEyeOpen = html`
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`;

const iconEyeClosed = html`
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
`;

@customElement('bb-balance-card')
export class BbBalanceCard extends LitElement {
  @property({ type: String })
  greetingName = '';

  @property({ type: String })
  today = '';

  @property({ type: String })
  accountType = '';

  @property({ type: Number })
  balance = 0;

  @state()
  private visible = true;

  static styles = css`
    :host {
      display: block;
      background: var(--bb-primary, #374C34);
      color: white;
      border-radius: 1rem;
      min-height: 20rem;
    }

    /*
     * Padding lives here, not on :host, so Tailwind v4's preflight
     * (* { padding: 0 }) cannot override it — external stylesheets
     * cannot pierce the shadow DOM boundary.
     */
    .inner {
      padding: 2rem;
      box-sizing: border-box;
      min-height: inherit;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 1.5rem;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .title {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0;
    }

    .meta {
      margin-top: 0.5rem;
      opacity: 0.9;
      font-size: 0.95rem;
    }

    .balance {
      margin-top: 1.5rem;
      font-size: 2rem;
      font-weight: 300;
      letter-spacing: 0.03em;
    }

    /* Negativo visível: usa --bb-error mesmo sem atingir WCAG sobre o fundo primary */
    .balance--negative {
      color: var(--bb-error, #D8353A);
    }

    .toggle {
      background: transparent;
      border: none;
      color: var(--bb-warning, #f59e0b);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 0;
      margin-left: 0.5rem;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
  `;

  private toggleVisibility() {
    this.visible = !this.visible;
  }

  render() {
    // Cor vermelha só aparece quando o saldo está visível; oculto mantém branco
    const showNegativeColor = this.balance < 0 && this.visible;

    return html`
      <div class="inner">
        <div class="header">
          <div>
            <h1 class="title">Olá, ${this.greetingName}! :)</h1>
            <div class="meta">${this.today}</div>
          </div>
          <div>
            <div class="meta">${this.accountType}</div>
            <button type="button" class="toggle" @click=${this.toggleVisibility}
                    aria-label="${this.visible ? 'Ocultar saldo' : 'Mostrar saldo'}">
              ${this.visible ? iconEyeOpen : iconEyeClosed}
              ${this.visible ? 'Ocultar saldo' : 'Mostrar saldo'}
            </button>
          </div>
        </div>
        <div class="balance ${showNegativeColor ? 'balance--negative' : ''}">
          ${this.visible ? formatBrl.format(this.balance) : 'R$ •••••'}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bb-balance-card': BbBalanceCard;
  }
}
