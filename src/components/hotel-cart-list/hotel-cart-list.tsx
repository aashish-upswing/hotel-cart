import { Component, Host, h } from '@stencil/core';
import { groupBy } from 'lodash';
import { cartsStore } from '../../utils/data';

/**
 * Hotel Cart List Component
 *
 * Displays a list of hotel rooms currently in the cart.
 * If the cart is empty, shows a placeholder state.
 * Groups rooms by hotel name.
 */
@Component({
  tag: 'hotel-cart-list',
  styleUrl: 'hotel-cart-list.css',
  shadow: true,
})
export class HotelCartList {
  render() {
    const hasItems = cartsStore.rooms.length > 0;

    // 1. Empty State
    if (!hasItems) {
      return (
        <Host>
          <div class="empty-cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any rooms to your cart yet.</p>
          </div>
        </Host>
      );
    }

    // 2. Grouped List
    const groupedItems = groupBy(cartsStore.rooms, 'hotelName');
    const hotelNames = Object.keys(groupedItems);

    return (
      <Host>
        {hotelNames.map(hotelName => (
          <hotel-cart-group hotelName={hotelName} item={groupedItems[hotelName]} />
        ))}
      </Host>
    );
  }
}
