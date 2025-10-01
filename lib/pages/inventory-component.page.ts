import { Page, Locator, expect } from '@playwright/test';
import { InventoryItemComponent } from '../component/inventory-item.component';

export class InventoryPageWithComponents {
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(readonly page: Page) {
    this.inventoryContainer = page.locator('#inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  getItemComponent(itemName: string): InventoryItemComponent {
    const itemLocator = this.inventoryItems.filter({ hasText: itemName });
    return new InventoryItemComponent(itemLocator);
  }

  getItemComponentByIndex(index: number): InventoryItemComponent {
    const itemLocator = this.inventoryItems.nth(index);
    return new InventoryItemComponent(itemLocator);
  }

  getFirstItemComponent(): InventoryItemComponent {
    return this.getItemComponentByIndex(0);
  }

  async getAllItemComponents(): Promise<InventoryItemComponent[]> {
    const count = await this.inventoryItems.count();
    const components: InventoryItemComponent[] = [];

    for (let i = 0; i < count; i++) {
      components.push(this.getItemComponentByIndex(i));
    }

    return components;
  }

  // Page-level navigation methods
  async goto() {
    await this.page.goto('/inventory.html');
  }

  async isLoaded() {
    await expect(this.page).toHaveURL(/.*inventory/);
    await this.inventoryContainer.first().waitFor({ state: 'visible' });
  }

  // Shopping cart methods (page-level functionality)
  async getCartBadgeCount(): Promise<number> {
    const count = await this.shoppingCartBadge.textContent();
    return count ? parseInt(count) : 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  // Sorting functionality (page-level functionality)
  async sortBy(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getItemNames(): Promise<string[]> {
    const itemNames = this.inventoryItems.locator('.inventory_item_name');
    const names = await itemNames.allTextContents();
    return names;
  }

  // Convenience methods that use components internally
  async addItemToCart(itemName: string) {
    const itemComponent = this.getItemComponent(itemName);
    await itemComponent.addToCart();
  }

  async addFirstItemToCart() {
    const firstItemComponent = this.getFirstItemComponent();
    await firstItemComponent.addToCart();
  }

  async getFirstItemName(): Promise<string | null> {
    const firstItemComponent = this.getFirstItemComponent();
    const nameLocator = firstItemComponent.item.locator('.inventory_item_name');
    return await nameLocator.textContent();
  }

  async getItemPrice(itemName: string): Promise<string | null> {
    const itemComponent = this.getItemComponent(itemName);
    return await itemComponent.price.textContent();
  }

  async getItemDescription(itemName: string): Promise<string | null> {
    const itemComponent = this.getItemComponent(itemName);
    return await itemComponent.description.textContent();
  }

  // User menu methods
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
