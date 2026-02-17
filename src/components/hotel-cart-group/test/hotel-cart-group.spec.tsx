import { newSpecPage } from '@stencil/core/testing';
import { HotelCartGroup } from '../hotel-cart-group';

describe('hotel-cart-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HotelCartGroup],
      html: `<hotel-cart-group></hotel-cart-group>`,
    });
    expect(page.root).toEqualHtml(`
      <hotel-cart-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hotel-cart-group>
    `);
  });
});
