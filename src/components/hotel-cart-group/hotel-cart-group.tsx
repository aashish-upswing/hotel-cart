import { Component, Host, h, Prop } from '@stencil/core';
import { RoomData, updateRoom } from '../../utils/data';

@Component({
  tag: 'hotel-cart-group',
  styleUrl: 'hotel-cart-group.css',
  shadow: true,
})
export class HotelCartGroup {
  @Prop() item: RoomData[] = [];
  @Prop() hotelName: string;

  render() {
    if (!this.item || this.item.length === 0) return null;

    const firstItem = this.item[0];
    const subtotal = this.item.reduce((acc, curr) => acc + curr.price, 0);

    return (
      <Host>
        <div class="group-header">
          <img src={firstItem.imageUrl} alt={firstItem.hotelName} class="hotel-thumbnail" />
          <div class="header-info">
            <h3>{firstItem.hotelName}</h3>
            <span class="reservation-count">
              {this.item.length} {this.item.length === 1 ? 'reservation' : 'reservations'}
            </span>
          </div>
        </div>

        <div class="group-items">
          {this.item.map(room => (
            <hotel-cart-card item={room} isGrouped={true} onItemUpdated={(e: CustomEvent<RoomData>) => updateRoom(e.detail)}></hotel-cart-card>
          ))}
        </div>

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
