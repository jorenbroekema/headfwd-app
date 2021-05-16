import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/HeadfwdApp.js';

describe('HeadfwPlaylists', () => {
  it('fetches artist one', async () => {
    const el = await fixture(html`<headfwd-app></headfwd-app>`);
    await el.fetchArtistOneComplete;
    await el.updateComplete;
    await expect(el).shadowDom.to.equal(`
      <div class="nav">
        <a href="/">Home</a>
        <a href="/foo">Foo</a>
        <a href="/bar">bar</a>
      </div>
      <p>3 Doors Down</p>
      <main>
        <headfwd-foo></headfwd-foo>
      </main>
    `);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<headfwd-app></headfwd-app>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
