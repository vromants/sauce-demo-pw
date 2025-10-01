import { Locator } from '@playwright/test';

export class InventoryItemComponent {
  readonly item: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;

  constructor(readonly root: Locator) {
    // All locators are relative to the root locator
    this.item = root;
    this.name = this.item.locator('.inventory_item_name');
    this.description = this.item.locator('.inventory_item_desc');
    this.price = this.item.locator('.inventory_item_price');
    this.image = this.item.locator('.inventory_item_img');
    this.addButton = this.item.locator('button[data-test*="add-to-cart"]');
    this.removeButton = this.item.locator('button[data-test*="remove"]');
  }

  // Component-level actions
  async addToCart() {
    await this.addButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }

  async getName(): Promise<string | null> {
    return await this.name.textContent();
  }

  async getDescription(): Promise<string | null> {
    return await this.description.textContent();
  }

  async getPrice(): Promise<string | null> {
    return await this.price.textContent();
  }

  async isAddedToCart(): Promise<boolean> {
    return await this.removeButton.isVisible();
  }

  async clickName() {
    await this.name.click();
  }

  async clickImage() {
    await this.image.click();
  }

  /**
   * Gets all item details as an object
   */
  async getItemDetails(): Promise<{
    name: string | null;
    description: string | null;
    price: string | null;
    isInCart: boolean;
  }> {
    return {
      name: await this.getName(),
      description: await this.getDescription(),
      price: await this.getPrice(),
      isInCart: await this.isAddedToCart(),
    };
  }
}
