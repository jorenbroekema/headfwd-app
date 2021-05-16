import { LitElement, html, css } from 'lit';
import page from 'page';

import './HeadfwdBar.js';
import './HeadfwdFoo.js';

/** @typedef {import('../types/db-schema').Artist} Artist */

export class HeadfwdApp extends LitElement {
  static get properties() {
    return {
      artistOne: { attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        text-align: center;
      }
    `;
  }

  constructor() {
    super();
    this.pageTemplate = html`<headfwd-foo></headfwd-foo>`;
    /** @type {Artist | undefined} */
    this.artistOne = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupRouting();
    this.fetchArtistOne();
  }

  setupRouting() {
    page('/', () => {
      this.pageTemplate = html`<headfwd-foo></headfwd-foo>`;
    });

    page('/foo', () => {
      this.pageTemplate = html`<headfwd-foo></headfwd-foo>`;
    });

    page('/bar', () => {
      this.pageTemplate = html`<headfwd-bar></headfwd-bar>`;
    });

    page();

    this.addEventListener('change-route', (e) => {
      page(`/${e.detail}`);
    });
  }

  render() {
    return html`
      <div class="nav">
        <a href="/">Home</a>
        <a href="/foo">Foo</a>
        <a href="/bar">bar</a>
      </div>
      <p>${this.artistOne ? this.artistOne.name : 'loading..'}</p>
      <main>${this.pageTemplate}</main>
    `;
  }

  async fetchArtistOne() {
    this.fetchArtistOneComplete = new Promise((resolve) => {
      this.fetchArtistOneCompleteResolve = resolve;
    });

    const result = await fetch('/api/artists/1');
    if (result.status === 200) {
      this.artistOne = await result.json();
    } else {
      throw new Error('Could not fetch artist one');
    }

    this.fetchArtistOneCompleteResolve();
  }
}
customElements.define('headfwd-app', HeadfwdApp);
