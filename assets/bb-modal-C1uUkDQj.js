import{i as h,a as p,b as l}from"./lit-element-kDLlXEcT.js";import{n as s,t as b}from"./property-DOEbTfJd.js";var m=Object.defineProperty,u=Object.getOwnPropertyDescriptor,r=(o,a,n,i)=>{for(var e=i>1?void 0:i?u(a,n):a,d=o.length-1,c;d>=0;d--)(c=o[d])&&(e=(i?c(a,n,e):c(e))||e);return i&&e&&m(a,n,e),e};let t=class extends p{constructor(){super(...arguments),this.open=!1,this.title="",this.size="md",this.ariaLabel="Modal dialog"}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleBackdropClick(o){o.target===this.shadowRoot?.querySelector(".backdrop")&&this.handleClose()}render(){return this.open?l`
      <div class="backdrop" @click=${this.handleBackdropClick}>
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label=${this.ariaLabel}
          @click=${o=>o.stopPropagation()}
        >
          ${this.title?l`
                <div class="modal-header">
                  <h2 class="modal-title">${this.title}</h2>
                  <button type="button" class="close" @click=${this.handleClose} aria-label="Fechar">×</button>
                </div>
              `:l`
                <button type="button" class="close close--floating" @click=${this.handleClose} aria-label="Fechar">×</button>
              `}
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `:l``}};t.styles=h`
    /*
     * Default: hidden and removed from layout so it never blocks pointer events.
     * :host([open]) re-enables it only when the modal is actually open.
     * (reflect: true keeps the HTML attribute in sync with this.open)
     */
    :host {
      display: none;
    }

    :host([open]) {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 1000;
    }

    /* backdrop fills the entire fixed overlay — centering lives here */
    .backdrop {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);
    }

    /* 100% now correctly resolves to .backdrop width (= viewport) */
    .panel {
      background: white;
      border-radius: 1rem;
      width: calc(100% - 2rem);
      max-width: 34rem;
      max-height: 95vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    }

    :host([size="sm"]) .panel { max-width: 26rem; }
    :host([size="lg"]) .panel { max-width: 52rem; }

    /* Header com destaque primary — igual ao card */
    .modal-header {
      background: var(--bb-primary, #374C34);
      color: white;
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      border-radius: 1rem 1rem 0 0;
    }

    .modal-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
      color: white;
    }

    .modal-body {
      padding: 1.5rem;
      overflow: auto;
      flex: 1;
    }

    /* Botão fechar — branco no header, cinza flutuante sem título */
    .close {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      line-height: 1;
      padding: 0;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.85);
      transition: opacity 0.2s;
    }

    .close:hover {
      opacity: 1;
      color: white;
    }

    .close--floating {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: #4b5563;
    }
  `;r([s({type:Boolean,reflect:!0})],t.prototype,"open",2);r([s({type:String})],t.prototype,"title",2);r([s({reflect:!0})],t.prototype,"size",2);r([s({type:String,attribute:"aria-label"})],t.prototype,"ariaLabel",2);t=r([b("bb-modal")],t);
