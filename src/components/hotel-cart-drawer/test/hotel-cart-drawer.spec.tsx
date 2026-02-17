import { newSpecPage } from '@stencil/core/testing';
import { HotelCartDrawer } from '../hotel-cart-drawer';

describe('hotel-cart-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HotelCartDrawer],
      html: `<hotel-cart-drawer></hotel-cart-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <hotel-cart-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hotel-cart-drawer>
    `);
  });
});
