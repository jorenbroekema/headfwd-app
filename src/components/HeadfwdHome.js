import { LitElement, html, css } from 'lit';

import buttonStyles from './style-components/button.css.js';
import musicItemStyles from './style-components/music-item.css.js';
import deleteIcon from '../assets/svgs/delete.svg.js';

export class HeadfwdHome extends LitElement {
  static get properties() {
    return {
      playlists: { attribute: false },
      displayForm: { attribute: false },
    };
  }

  static get styles() {
    return [
      buttonStyles,
      musicItemStyles,
      css`
        :host {
          display: block;
        }

        .btn {
          margin: 20px auto;
          display: block;
        }

        .playlist-form {
          display: inline-block;
        }

        .playlist-form input {
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.displayForm = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPlaylists();
  }

  render() {
    return html`
      <h1>Playlists</h1>
      ${this.playlists
        ? this.playlists.map(
            (playlist) => html` ${this.playlistTemplate(playlist)} `,
          )
        : 'Loading playlists..'}
      <button @click=${this.toggleForm} class="btn">Add Playlist</button>
      ${this.displayForm ? this.formTemplate() : ''}
    `;
  }

  playlistTemplate(playlist) {
    return html`
      <div class="music-item">
        <a href="/playlist/${playlist.name}">
          <div class="music-item-container">
            <img
              class="music-item-img"
              alt="Music placeholder"
              .src="${new URL(
                '../assets/images/music-placeholder.png',
                import.meta.url,
              ).pathname}"
            />
            <span>${playlist.name}</span>
          </div>
          <div class="music-item-container">
            <span>${playlist.songs.length} songs</span>
          </div>
        </a>
        <div
          tabindex="0"
          @keydown=${(ev) => this.deletePlaylist(playlist.name, ev)}
          @click=${() => this.deletePlaylist(playlist.name)}
          class="delete-wrapper"
        >
          ${deleteIcon}
        </div>
      </div>
    `;
  }

  formTemplate() {
    return html`
      <form class="playlist-form" @submit="${this.submitForm}">
        <label>
          Playlist Name
          <input required type="text" name="name" />
        </label>
        <button class="btn">Submit</button>
      </form>
    `;
  }

  async fetchPlaylists() {
    this.playlists =
      JSON.parse(localStorage.getItem('headfwd-playlists')) ?? [];
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  submitForm(ev) {
    ev.preventDefault();
    const userValue = ev.target.elements.name.value;

    localStorage.setItem(
      'headfwd-playlists',
      JSON.stringify([...this.playlists, { name: userValue, songs: [] }]),
    );
    this.fetchPlaylists();
    this.displayForm = false;
  }

  async deletePlaylist(name, ev) {
    if (ev && ev.key !== 'Enter') {
      return;
    }

    localStorage.setItem(
      'headfwd-playlists',
      JSON.stringify(this.playlists.filter((list) => list.name !== name)),
    );

    this.fetchPlaylists();
  }
}
customElements.define('headfwd-home', HeadfwdHome);
