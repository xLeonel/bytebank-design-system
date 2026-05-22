import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type SidebarItem = {
  href: string;
  label: string;
};

@customElement('bb-sidebar')
export class BbSidebar extends LitElement {
  @property({ type: Array, attribute: false })
  items: SidebarItem[] = [];

  @state()
  private currentPath = '';

  static styles = css`
    :host {
      display: block;
    }

    nav {
      background: white;
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    a {
      display: block;
      text-decoration: none;
      padding: 0.85rem 1rem;
      border-radius: 0.5rem;
      color: #374151;
      font-size: 0.95rem;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    a:hover {
      background: #f3f4f6;
    }

    a.active {
      color: #047857;
      font-weight: 700;
      background: #ecfdf5;
    }
  `;

  firstUpdated() {
    this.currentPath = window.location.pathname;
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.items.map(
            (item) => html`
              <li>
                <a
                  href="${item.href}"
                  class="${item.href === this.currentPath ? 'active' : ''}"
                >
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
