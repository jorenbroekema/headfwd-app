import { LionCombobox } from '@lion/combobox';
import { css } from 'lit';

export class HeadfwdCombobox extends LionCombobox {
  static get styles() {
    return [
      super.styles,
      css`
        * > ::slotted([role='listbox']) {
          max-height: 400;
          background-color: var(--primary-color);
        }
      `,
    ];
  }

  _defineOverlayConfig() {
    return /** @type {OverlayConfig} */ ({
      ...super._defineOverlayConfig(),
      popperConfig: {
        ...super._defineOverlayConfig().popperConfig,
        placement: 'bottom',
      },
    });
  }
}
customElements.define('headfwd-combobox', HeadfwdCombobox);
