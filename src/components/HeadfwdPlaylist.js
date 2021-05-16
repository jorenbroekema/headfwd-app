import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import '@lion/select-rich/define';

import deleteIcon from '../assets/svgs/delete.svg.js';
import buttonStyles from './style-components/button.css.js';
import musicItemStyles from './style-components/music-item.css.js';
import './HeadfwdCombobox.js';
import './HeadfwdOption.js';

export class HeadfwdPlaylist extends LitElement {
  static get properties() {
    return {
      name: { type: String, reflect: true },
      songs: { attribute: false },
      displayForm: { attribute: false },
    };
  }

  static get styles() {
    return [
      buttonStyles,
      musicItemStyles,
      css`
        .btn {
          margin: 20px auto;
          display: block;
        }

        headfwd-combobox {
          max-width: 300px;
          margin: 0 auto;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.songs = [];
    this.comboOptions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPlaylist();
  }

  render() {
    return html`
      <h1>
        ${this.name
          ? html`${this.name} - ${this.songs.length} songs`
          : 'Loading...'}
      </h1>
      <div class="song-list">
        ${this.songs.map(
          (song) => html`
            <div class="music-item">
              <!-- href should become /songs/:id} -->
              <a href="#">
                <div class="music-item-container">
                  <img
                    class="music-item-img"
                    alt="Music placeholder"
                    .src="${new URL(
                      '../assets/images/music-placeholder.png',
                      import.meta.url,
                    ).pathname}"
                  />
                  <span>${song.name}</span>
                </div>
                <div class="music-item-container">
                  <span>${song.time}</span>
                </div>
              </a>
              <div
                tabindex="0"
                @keydown=${(ev) => this.deleteSong(song.id, ev)}
                @click=${() => this.deleteSong(song.id)}
                class="delete-wrapper"
              >
                ${deleteIcon}
              </div>
            </div>
          `,
        )}
      </div>
      <button @click=${this.toggleForm} class="btn">Add Song</button>
      ${this.displayForm ? this.formTemplate() : ''}
    `;
  }

  formTemplate() {
    return html`
      <form class="playlist-form" @submit="${this.submitForm}">
        <headfwd-combobox
          @input=${this.fetchComboOptions}
          id="combo"
          label="Song"
        >
          ${this.comboOptions.length > 0
            ? repeat(
                this.comboOptions,
                (entry) => entry,
                (entry) =>
                  html`
                    <headfwd-option
                      .song=${entry}
                      .choiceValue="${entry.name}"
                    ></headfwd-option>
                  `,
              )
            : ''}
        </headfwd-combobox>
        <button class="btn">Submit</button>
      </form>
    `;
  }

  async fetchComboOptions(e) {
    this.comboOptions = await this.searchSongs(e.target.value);
    this.requestUpdate();
  }

  // eslint-disable-next-line class-methods-use-this
  async searchSongs(searchVal) {
    const result = await fetch(`/api/songs?q=${searchVal}&_limit=20`);
    if (result.status === 200) {
      return result.json();
    }
    return [];
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  async submitForm(ev) {
    ev.preventDefault();
    const combobox = this.shadowRoot.getElementById('combo');
    const { song } = combobox.formElements.find((el) => el.checked);

    let playlists = JSON.parse(localStorage.getItem('headfwd-playlists'));
    playlists = playlists.map((list) => {
      if (list.name === this.name) {
        return {
          ...list,
          songs: [...list.songs, song.id],
        };
      }
      return list;
    });
    localStorage.setItem('headfwd-playlists', JSON.stringify(playlists));

    await this.fetchPlaylist();
    this.displayForm = false;
  }

  async fetchPlaylist() {
    const playlist = JSON.parse(localStorage.getItem('headfwd-playlists')).find(
      (list) => list.name === this.name,
    );

    this.songs = await this.fetchSongs(playlist.songs);
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchSongs(ids) {
    if (ids.length > 0) {
      const result = await fetch(
        `/api/songs?${ids.reduce((acc, id) => `${acc}id=${id}&`, '')}`,
      );
      if (result.status === 200) {
        const response = await result.json();
        return response;
      }
    }
    return [];
  }

  deleteSong(songId, ev) {
    if (ev && ev.key !== 'Enter') {
      return;
    }

    let playlists = JSON.parse(localStorage.getItem('headfwd-playlists'));
    playlists = playlists.map((list) => {
      if (list.name === this.name) {
        return {
          ...list,
          songs: list.songs.filter((song) => song !== songId),
        };
      }
      return list;
    });
    localStorage.setItem('headfwd-playlists', JSON.stringify(playlists));

    this.fetchPlaylist();
  }
}
customElements.define('headfwd-playlist', HeadfwdPlaylist);
