import { LitElement, html } from 'lit';

export class HeadfwdBar extends LitElement {
  render() {
    return html`<h1>Bar</h1>`;
  }
}
customElements.define('headfwd-bar', HeadfwdBar);
