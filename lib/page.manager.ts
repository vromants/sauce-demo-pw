import { CartPage, InventoryPage, LoginPage } from './pages';
import { Page } from '@playwright/test';
// import {InventoryPageWithComponents} from "./pages/inventory-component.page";

export class PageManager {
  readonly loginPage: LoginPage;
  readonly inventoryPage: InventoryPage;
  readonly cartPage: CartPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.cartPage = new CartPage(page);
  }
}
