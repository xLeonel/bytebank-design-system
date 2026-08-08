import{i as p,a as c,b as n}from"./lit-element-kDLlXEcT.js";import{n as h,t as b}from"./property-DOEbTfJd.js";import{r as f}from"./state-B_GU6Iad.js";/* empty css                */var m=Object.defineProperty,g=Object.getOwnPropertyDescriptor,i=(r,t,d,s)=>{for(var e=s>1?void 0:s?g(t,d):t,a=r.length-1,l;a>=0;a--)(l=r[a])&&(e=(s?l(t,d,e):l(e))||e);return s&&e&&m(t,d,e),e};let o=class extends c{constructor(){super(),this.size="md",this.title="",this._hasFooter=!1}_onFooterSlotChange(r){const t=r.target;this._hasFooter=t.assignedNodes({flatten:!0}).length>0}render(){return n`
      <div class="card">
        ${this.title?n`<div class="header"><slot name="header">${this.title}</slot></div>`:""}
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer" style=${this._hasFooter?"":"display:none"}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `}};o.styles=p`
    :host {
      display: block;
      background: white;
      border-radius: var(--bb-radius, 0.5rem);
      box-shadow: 0 4px 16px rgba(55, 76, 52, 0.14);
      border: 1px solid #d5dcd4;
      overflow: hidden;
    }

    .card {
      height: 100%;
    }

    .header {
      padding: 1.5rem;
      background: var(--bb-primary, #374C34);
      color: white;
      font-weight: 700;
      font-size: 1rem;
    }

    .content {
      padding: 1.5rem;
      color: var(--bb-dark, #332E2B);
    }

    .footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #d5dcd4;
      background: #f0f4ef;
      color: var(--bb-dark, #332E2B);
      font-size: 0.875rem;
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
  `;i([h({reflect:!0})],o.prototype,"size",2);i([h()],o.prototype,"title",2);i([f()],o.prototype,"_hasFooter",2);o=i([b("bb-card")],o);
