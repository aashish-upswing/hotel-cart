import { Component, Host, h } from '@stencil/core';
import { cartsStore } from '../../utils/data';
import { groupBy } from 'lodash';

@Component({
  tag: 'hotel-cart-list',
  styleUrl: 'hotel-cart-list.css',
  shadow: true,
})
export class HotelCartList {
  render() {
    //grouping logic
    const groupedItems = groupBy(cartsStore.rooms, 'hotelName');
    const hotelNames = Object.keys(groupedItems);

    return (
      <Host>
        {hotelNames.map(hotelName => (
          <hotel-cart-group hotelName={hotelName} item={groupedItems[hotelName]}></hotel-cart-group>
        ))}
      </Host>
    );
  }
}
