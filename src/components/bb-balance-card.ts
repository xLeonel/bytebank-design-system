import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const formatBrl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

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
      background: #005c6e;
      color: white;
      border-radius: 1rem;
      padding: 2rem;
      min-height: 20rem;
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

    .toggle {
      background: transparent;
      border: none;
      color: #f97316;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
      margin-left: 0.5rem;
    }
  `;

  private toggleVisibility() {
    this.visible = !this.visible;
  }

  render() {
    return html`
      <div class="header">
        <div>
          <h1 class="title">Olá, ${this.greetingName}! :)</h1>
          <div class="meta">${this.today}</div>
        </div>
        <div>
          <div class="meta">${this.accountType}</div>
          <button type="button" class="toggle" @click=${this.toggleVisibility}>
            ${this.visible ? 'Ocultar saldo' : 'Mostrar saldo'}
          </button>
        </div>
      </div>
      <div class="balance">
        ${this.visible ? formatBrl.format(this.balance) : 'R$ •••••'}
      </div>
    `;
  }
}
