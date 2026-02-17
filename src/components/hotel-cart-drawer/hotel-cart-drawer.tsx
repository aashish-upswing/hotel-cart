import { Component, Host, h, State, Method, getAssetPath } from '@stencil/core';
import { cartsStore } from '../../utils/data';

@Component({
  tag: 'hotel-cart-drawer',
  styleUrl: 'hotel-cart-drawer.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class HotelCartDrawer {
  @State() isOpen: boolean = false;

  @Method()
  async open() {
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.isOpen = false;
  }

  @Method()
  async toggle() {
    this.isOpen = !this.isOpen;
  }

  calculateTotal() {
    return cartsStore.rooms.reduce((acc, item) => acc + item.price, 0);
  }

  render() {
    const subtotal = this.calculateTotal();
    return (
      <Host class={{ 'is-open': this.isOpen }}>
        <div class="backdrop" onClick={() => this.close()}></div>
        <div class="drawer">
          <div class="header">
            <div class="title-group">
              <img src={getAssetPath('assets/cart.svg')} alt="cart" class="cart-icon" />
              <h2>Your Cart</h2>
              <span class="badge">{cartsStore.rooms.length}</span>
            </div>
            <button class="close-btn" onClick={() => this.close()}>
              <img src={getAssetPath('assets/close.svg')} alt="close" />
            </button>
          </div>

          <div class="content">
            <hotel-cart-list></hotel-cart-list>
          </div>

          <div class="footer">
            <div class="summary-row">
              <span>Subtotal ({cartsStore.rooms.length} items)</span>
              <span>${subtotal}</span>
            </div>
            <div class="summary-row small">
              <span>Taxes & Fees</span>
              <span>Calculated at checkout</span>
            </div>

            <div class="total-row">
              <span>Total</span>
              <span class="total-price">${subtotal}</span>
            </div>

            <app-button variant="primary">Proceed to Checkout </app-button>
          </div>
        </div>
      </Host>
    );
  }
}
