import { Component, Host, Prop, h } from '@stencil/core';
import { RoomData, deleteRoom, updateRoom } from '../../utils/data';

/**
 * Hotel Cart Group Component
 *
 * Groups multiple reservations from the same hotel into a single card container.
 * Displays a summary header, the list of rooms, and a total subtotal footer.
 */
@Component({
  tag: 'hotel-cart-group',
  styleUrl: 'hotel-cart-group.css',
  shadow: true,
})
export class HotelCartGroup {
  // 1. Props
  /**
   * List of rooms belonging to this hotel group.
   */
  @Prop() item: RoomData[] = [];

  /**
   * The name of the hotel (redundant if checking first item, but explicit prop).
   */
  @Prop() hotelName: string;

  // 2. Render
  render() {
    if (!this.item || this.item.length === 0) return null;

    const firstItem = this.item[0];
    const subtotal = this.item.reduce((acc, curr) => acc + curr.price, 0);

    return (
      <Host>
        {/* Group Header */}
        <div class="group-header">
          <img src={firstItem.imageUrl} alt={firstItem.hotelName} class="hotel-thumbnail" />
          <div class="header-info">
            <h3>{firstItem.hotelName}</h3>
            <span class="reservation-count">
              {this.item.length} {this.item.length === 1 ? 'reservation' : 'reservations'}
            </span>
          </div>
        </div>

        {/* Room List */}
        <div class="group-items">
          {this.item.map(room => (
            <hotel-cart-card
              item={room}
              isGrouped={true}
              onItemUpdated={e => updateRoom(e.detail)} // In a real app, emit event up instead of direct store call
              onItemDeleted={e => deleteRoom(e.detail)}
            />
          ))}
        </div>

        {/* Group Footer (Multi-item only) */}
        {this.item.length > 1 && (
          <div class="group-footer">
            <span class="footer-label">Hotel Subtotal</span>
            <span class="footer-price">${subtotal}</span>
          </div>
        )}
      </Host>
    );
  }
}
