import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/HeadfwdApp.js';

describe('HeadfwPlaylists', () => {
  it('correctly renders the app shell', async () => {
    const el = await fixture(html`<headfwd-app></headfwd-app>`);

    await expect(el).shadowDom.to.equal(`
      <div class="nav">
        <a href="/">Home</a>
        <a href="/catalogue">Catalogue</a>
      </div>
      <main>
        <headfwd-home></headfwd-home>
      </main>
    `);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<headfwd-app></headfwd-app>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
