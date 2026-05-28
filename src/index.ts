/**
 * Bytebank Design System - Web Components Library
 *
 * A collection of reusable Web Components built with Lit, Vite, and TypeScript
 * Styled with Tailwind CSS and ready for use in Next.js, Angular, and other frameworks
 */

export * from './components/bb-button/bb-button';
export * from './components/bb-card/bb-card';
export * from './components/bb-badge/bb-badge';
export * from './components/bb-field/bb-field';
export * from './components/bb-modal/bb-modal';
export * from './components/bb-sidebar/bb-sidebar';
export * from './components/bb-transaction-list/bb-transaction-list';
export * from './components/bb-balance-card/bb-balance-card';
export * from './components/bb-new-transaction-modal/bb-new-transaction-modal';
export * from './components/bb-transaction-detail-modal/bb-transaction-detail-modal';

// Brand assets
export { default as bbFaviconUrl } from './assets/favicon.png?url';
export { default as bbLogoUrl } from './assets/logo.png?url';

// Import styles globally
import './styles/globals.css';
