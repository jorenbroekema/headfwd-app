import { LitElement, html, css } from 'lit';
import page from 'page';

import './HeadfwdHome.js';
import './HeadfwdCatalogue.js';
import './HeadfwdPlaylist.js';

/** @typedef {import('../types/db-schema').Artist} Artist */

export class HeadfwdApp extends LitElement {
  static get properties() {
    return {
      pageTemplate: { attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        text-align: center;
      }

      .nav {
        margin-top: 30px;
        margin-bottom: 50px;
        text-transform: uppercase;
      }

      .nav-item {
        color: var(--text-color);
        margin: 0 20px;
        text-decoration: none;
      }
    `;
  }

  constructor() {
    super();
    this.pageTemplate = html`<headfwd-home></headfwd-home>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupRouting();
  }

  setupRouting() {
    page('/', () => {
      this.pageTemplate = html`<headfwd-home></headfwd-home>`;
    });

    page('/playlist/:name', (ctx) => {
      this.pageTemplate = html`<headfwd-playlist
        .name=${ctx.params.name}
      ></headfwd-playlist>`;
    });

    page('/catalogue', () => {
      this.pageTemplate = html`<headfwd-catalogue></headfwd-catalogue>`;
    });

    page();

    this.addEventListener('change-route', (e) => {
      page(`/${e.detail}`);
    });
  }

  render() {
    return html`
      <div class="nav">
        <a class="nav-item" href="/">Home</a>
        <a class="nav-item" href="/catalogue">Catalogue</a>
      </div>
      <main>${this.pageTemplate}</main>
    `;
  }
}
customElements.define('headfwd-app', HeadfwdApp);
