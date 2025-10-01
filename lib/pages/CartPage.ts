import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('button[data-test*="remove"]');
  }

  async isLoaded() {
    await this.cartList.waitFor({ state: 'visible' });
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getItemNames() {
    const itemNames = this.cartItems.locator('.inventory_item_name');
    const names = await itemNames.allTextContents();
    return names;
  }

  async getItemQuantity(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    const quantity = item.locator('.cart_quantity');
    return await quantity.textContent();
  }

  async getItemPrice(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    const price = item.locator('.inventory_item_price');
    return await price.textContent();
  }

  async removeItem(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    const removeButton = item.locator('button[data-test*="remove"]');
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async isItemInCart(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    return await item.isVisible();
  }
}
