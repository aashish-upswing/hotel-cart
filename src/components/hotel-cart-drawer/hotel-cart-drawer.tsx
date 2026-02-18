import { Component, Host, State, Method, getAssetPath, h } from '@stencil/core';
import { cartsStore } from '../../utils/data';

/**
 * Hotel Cart Drawer Component
 *
 * A slide-out drawer that displays the current items in the cart,
 * shows a subtotal summary, and provides a checkout action.
 */
@Component({
  tag: 'hotel-cart-drawer',
  styleUrl: 'hotel-cart-drawer.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class HotelCartDrawer {
  // 1. State
  @State() isOpen: boolean = false;

  // 2. Public Methods
  /**
   * Opens the cart drawer.
   */
  @Method()
  async open() {
    this.isOpen = true;
  }

  /**
   * Closes the cart drawer.
   */
  @Method()
  async close() {
    this.isOpen = false;
  }

  /**
   * Toggles the open state of the drawer.
   */
  @Method()
  async toggle() {
    this.isOpen = !this.isOpen;
  }

  // 3. Private Internal Methods
  private calculateTotal() {
    return cartsStore.rooms.reduce((acc, item) => acc + item.price, 0);
  }

  // 4. Render
  render() {
    const subtotal = this.calculateTotal();

    return (
      <Host class={{ 'is-open': this.isOpen }}>
        <div class="backdrop" onClick={() => this.close()} />

        <div class="drawer">
          {/* Header */}
          <div class="header">
            <div class="title-group">
              <img src={getAssetPath('assets/cart.svg')} alt="Cart Icon" class="cart-icon" />
              <h2>Your Cart</h2>
              <span class="badge">{cartsStore.rooms.length}</span>
            </div>
            <button class="close-btn" onClick={() => this.close()} aria-label="Close Cart">
              <img src={getAssetPath('assets/close.svg')} alt="Close" />
            </button>
          </div>

          {/* Content (Cart List) */}
          <div class="content">
            <hotel-cart-list />
          </div>

          {/* Footer (Summary & Action) */}
          {cartsStore.rooms.length > 0 && (
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

              <app-button variant="primary" label="Proceed to Checkout" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
