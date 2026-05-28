import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SidebarItem = {
  href: string;
  label: string;
};

@customElement('bb-sidebar')
export class BbSidebar extends LitElement {
  @property({ type: Array, attribute: false })
  items: SidebarItem[] = [];

  /**
   * The currently active path used to highlight the matching nav item.
   *
   * Consumers can set this attribute directly (e.g. `current-path="/home"`)
   * so the sidebar re-renders the correct active link without a full remount.
   *
   * When not provided, falls back to `window.location.pathname` (read once
   * in `firstUpdated`). This fallback is useful for plain-HTML and Storybook
   * usage where the attribute isn't wired to a router.
   */
  @property({ attribute: 'current-path', type: String })
  currentPath = '';

  static styles = css`
    :host {
      display: block;
    }

    nav {
      background: white;
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 4px 16px rgba(55, 76, 52, 0.12);
      border: 1px solid #d5dcd4;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    li {
      border-bottom: 1px solid #d5dcd4;
    }

    li:last-child {
      border-bottom: none;
    }

    a {
      display: block;
      text-decoration: none;
      padding: 0.85rem 1rem;
      border-radius: 0.5rem;
      color: var(--bb-dark, #332E2B);
      font-size: 0.95rem;
      font-weight: 500;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    /* Hover: texto primary + tint verde — contraste ~8:1 ✅ AA */
    a:hover {
      background: #e8ede7;
      color: var(--bb-primary, #374C34);
    }

    /* Ativo: fundo primary sólido + texto branco — contraste 9.4:1 ✅ AAA */
    a.active {
      background: var(--bb-primary, #374C34);
      color: white;
      font-weight: 700;
    }
  `;

  firstUpdated() {
    // Apply the window fallback only when the consumer hasn't set current-path
    if (!this.currentPath) {
      this.currentPath = window.location.pathname;
    }
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.items.map(
            (item) => html`
              <li>
                <a href="${item.href}" class="${item.href === this.currentPath ? 'active' : ''}">
                  ${item.label}
                </a>
              </li>
            `
          )}
        </ul>
      </nav>
    `;
  }
}
