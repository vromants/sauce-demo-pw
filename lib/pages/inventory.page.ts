import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('#inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async isLoaded() {
    await expect(this.page).toHaveURL(/.*inventory/);
    await this.inventoryContainer.first().waitFor({ state: 'visible' });
  }

  async addItemToCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    const addToCartButton = item.locator('button[data-test*="add-to-cart"]');
    await addToCartButton.click();
  }

  async addFirstItemToCart() {
    const firstItem = this.inventoryItems.first();
    const addToCartButton = firstItem.locator('button[data-test*="add-to-cart"]');
    await addToCartButton.click();
  }

  async getFirstItemName() {
    const firstItem = this.inventoryItems.first();
    const itemName = firstItem.locator('.inventory_item_name');
    return await itemName.textContent();
  }

  async getCartBadgeCount() {
    const count = await this.shoppingCartBadge.textContent();
    return count ? parseInt(count) : 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async sortBy(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getItemNames() {
    const itemNames = this.inventoryItems.locator('.inventory_item_name');
    const names = await itemNames.allTextContents();
    return names;
  }

  async logout() {
    const menuButton = this.page.locator('#react-burger-menu-btn');
    const logoutLink = this.page.locator('#logout_sidebar_link');

    await menuButton.click();
    await logoutLink.click();
  }
}
