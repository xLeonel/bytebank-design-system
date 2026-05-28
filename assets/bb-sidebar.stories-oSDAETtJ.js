import{i as f,a as v,b as u}from"./lit-element-kDLlXEcT.js";import{n as h,t as x}from"./property-DOEbTfJd.js";var y=Object.defineProperty,g=Object.getOwnPropertyDescriptor,b=(e,a,r,d)=>{for(var t=d>1?void 0:d?g(a,r):a,l=e.length-1,p;l>=0;l--)(p=e[l])&&(t=(d?p(a,r,t):p(t))||t);return d&&t&&y(a,r,t),t};let c=class extends v{constructor(){super(...arguments),this.items=[],this.currentPath=""}firstUpdated(){this.currentPath||(this.currentPath=window.location.pathname)}render(){return u`
      <nav>
        <ul>
          ${this.items.map(e=>u`
              <li>
                <a href="${e.href}" class="${e.href===this.currentPath?"active":""}">
                  ${e.label}
                </a>
              </li>
            `)}
        </ul>
      </nav>
    `}};c.styles=f`
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
  `;b([h({type:Array,attribute:!1})],c.prototype,"items",2);b([h({attribute:"current-path",type:String})],c.prototype,"currentPath",2);c=b([x("bb-sidebar")],c);const E={title:"Components/Sidebar",component:"bb-sidebar",tags:["autodocs"],argTypes:{"current-path":{control:"text",description:"Active route path"}}},A=[{href:"/home",label:"Início"},{href:"/extrato",label:"Extrato"},{href:"/investimentos",label:"Investimentos"},{href:"/cartoes",label:"Cartões"},{href:"/servicos",label:"Serviços"}];function m(e,a=A){const r=document.createElement("bb-sidebar");return r.items=a,e&&(r.currentPath=e),r}const o={render:()=>m()},s={name:"Active — Início",render:()=>m("/home")},i={name:"Active — Extrato",render:()=>m("/extrato")},n={render:()=>m("/home",[{href:"/home",label:"Início"},{href:"/extrato",label:"Extrato"}])};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => makeSidebar()
}`,...o.parameters?.docs?.source},description:{story:"No item active (path doesn't match any href)",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Active — Início',
  render: () => makeSidebar('/home')
}`,...s.parameters?.docs?.source},description:{story:'First item active — simulates "/home" route',...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Active — Extrato',
  render: () => makeSidebar('/extrato')
}`,...i.parameters?.docs?.source},description:{story:'Second item active — simulates "/extrato" route',...i.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => makeSidebar('/home', [{
    href: '/home',
    label: 'Início'
  }, {
    href: '/extrato',
    label: 'Extrato'
  }])
}`,...n.parameters?.docs?.source},description:{story:"Minimal two-item sidebar",...n.parameters?.docs?.description}}};const I=["Default","ActiveHome","ActiveExtrato","FewItems"];export{i as ActiveExtrato,s as ActiveHome,o as Default,n as FewItems,I as __namedExportsOrder,E as default};
