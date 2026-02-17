import { newE2EPage } from '@stencil/core/testing';

describe('hotel-cart-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hotel-cart-group></hotel-cart-group>');

    const element = await page.find('hotel-cart-group');
    expect(element).toHaveClass('hydrated');
  });
});
