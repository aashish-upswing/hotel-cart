import { newE2EPage } from '@stencil/core/testing';

describe('hotel-cart-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hotel-cart-list></hotel-cart-list>');

    const element = await page.find('hotel-cart-list');
    expect(element).toHaveClass('hydrated');
  });
});
