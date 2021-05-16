import { LitElement, html } from 'lit';

export class HeadfwdCatalogue extends LitElement {
  render() {
    return html`
      <h1>Catalogue</h1>
      <p>Coming soon</p>
    `;
  }
}
customElements.define('headfwd-catalogue', HeadfwdCatalogue);
