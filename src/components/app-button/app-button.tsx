import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.css',
  shadow: true,
})
export class AppButton {
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' | 'action' | 'danger' | 'outline' | 'edit' | 'delete' = 'primary';
  @Prop() label: string;
  @Prop() square: boolean = false;

  render() {
    return (
      <button class={`btn btn-${this.variant} ${this.square ? 'btn-square' : ''}`}>
        {this.label}
        <slot></slot>
      </button>
    );
  }
}
