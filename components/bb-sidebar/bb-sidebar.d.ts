import { LitElement } from 'lit';
export type SidebarItem = {
    href: string;
    label: string;
};
export declare class BbSidebar extends LitElement {
    items: SidebarItem[];
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
    currentPath: string;
    static styles: import('lit').CSSResult;
    firstUpdated(): void;
    render(): import('lit-html').TemplateResult<1>;
}
