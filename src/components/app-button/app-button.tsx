import { Component, Prop, h } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'action' | 'danger' | 'outline' | 'edit' | 'delete';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.css',
  shadow: true,
})
export class AppButton {
  /**
   * The visual style of the button.
   */
  @Prop() variant: ButtonVariant = 'primary';

  /**
   * The text to display inside the button.
   */
  @Prop() label: string;

  /**
   * If true, the button will be square-shaped (useful for icon-only buttons).
   */
  @Prop() square: boolean = false;

  /**
   * If true, the button will be disabled and non-interactive.
   */
  @Prop() disabled: boolean = false;

  /**
   * The HTML type attribute of the button.
   */
  @Prop() type: ButtonType = 'button';

  render() {
    const classList = {
      'btn': true,
      [`btn-${this.variant}`]: true,
      'btn-square': this.square,
    };

    return (
      <button class={classList} type={this.type} disabled={this.disabled}>
        {this.label}
        <slot></slot>
      </button>
    );
  }
}
