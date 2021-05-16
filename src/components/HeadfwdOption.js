import { css, html } from '@lion/core';
import { LionOption } from '@lion/select-rich';

export class HeadfwdOption extends LionOption {
  static get properties() {
    return {
      song: {
        attribute: false,
      },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          background-color: var(--primary-color);
          color: var(--text-color);
        }
      `,
    ];
  }

  /**
   * Override of Lion ListboxMixin to not select with space.
   * Issue open on github to make it configurable as a single property
   * so we don't have to override this entire method
   */
  _listboxOnKeyDown(ev) {
    if (this.disabled) {
      return;
    }

    this._isHandlingUserInput = true;
    setTimeout(() => {
      // Since we can't control when subclasses are done handling keyboard input, we
      // schedule a timeout to reset _isHandlingUserInput
      this._isHandlingUserInput = false;
    });

    const { key } = ev;

    switch (key) {
      case 'Enter': {
        if (key === ' ' && this._listboxReceivesNoFocus) {
          return;
        }
        ev.preventDefault();
        if (!this.formElements[this.activeIndex]) {
          return;
        }

        if (this.formElements[this.activeIndex].disabled) {
          return;
        }

        if (this.formElements[this.activeIndex].href) {
          this.formElements[this.activeIndex].click();
        }

        this.setCheckedIndex(this.activeIndex);
        break;
      }
      case 'ArrowUp':
        ev.preventDefault();
        if (this.orientation === 'vertical') {
          this.activeIndex = this._getPreviousEnabledOption(this.activeIndex);
        }
        break;
      case 'ArrowLeft':
        if (this.orientation === 'horizontal') {
          this.activeIndex = this._getPreviousEnabledOption(this.activeIndex);
        }
        break;
      case 'ArrowDown':
        ev.preventDefault();
        if (this.orientation === 'vertical') {
          this.activeIndex = this._getNextEnabledOption(this.activeIndex);
        }
        break;
      case 'ArrowRight':
        if (this.orientation === 'horizontal') {
          this.activeIndex = this._getNextEnabledOption(this.activeIndex);
        }
        break;
      case 'Home':
        if (this._listboxReceivesNoFocus) {
          return;
        }
        ev.preventDefault();
        this.activeIndex = this._getNextEnabledOption(0, 0);
        break;
      case 'End':
        if (this._listboxReceivesNoFocus) {
          return;
        }
        ev.preventDefault();
        this.activeIndex = this._getPreviousEnabledOption(
          this.formElements.length - 1,
          0,
        );
        break;
      /* no default */
    }

    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    if (
      keys.includes(key) &&
      this.selectionFollowsFocus &&
      !this.multipleChoice
    ) {
      this.setCheckedIndex(this.activeIndex);
    }
  }

  render() {
    return html`
      <div class="choice-field__label">
        <slot></slot>
      </div>
      <div>
        <span>${this.song.name}</span>
        <span>${new Date(this.song.duration).toISOString().slice(14, -5)}</span>
      </div>
    `;
  }
}
customElements.define('headfwd-option', HeadfwdOption);
