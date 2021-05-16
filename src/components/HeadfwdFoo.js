import { LitElement, html } from 'lit';

export class HeadfwdFoo extends LitElement {
  render() {
    return html`<h1>Foo</h1>`;
  }
}
customElements.define('headfwd-foo', HeadfwdFoo);
