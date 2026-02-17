import { newE2EPage } from '@stencil/core/testing';

describe('hotel-cart-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hotel-cart-drawer></hotel-cart-drawer>');

    const element = await page.find('hotel-cart-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
