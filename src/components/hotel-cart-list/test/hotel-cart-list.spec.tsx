import { newSpecPage } from '@stencil/core/testing';
import { HotelCartList } from '../hotel-cart-list';

describe('hotel-cart-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HotelCartList],
      html: `<hotel-cart-list></hotel-cart-list>`,
    });
    expect(page.root).toEqualHtml(`
      <hotel-cart-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hotel-cart-list>
    `);
  });
});
