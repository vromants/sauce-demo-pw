import { test, expect } from '@playwright/test';
import { LoginPage } from '../lib/pages/LoginPage';
import { InventoryPage } from '../lib/pages/InventoryPage';
import { CartPage } from '../lib/pages/CartPage';

test.describe('Sauce Demo E2E Tests', () => {
  test('should login, add item to cart, and verify item in cart', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to login page and login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify we're on the inventory page
    await inventoryPage.isLoaded();
    await expect(page).toHaveURL(/.*inventory/);

    // Step 2: Get the name of the first item and add it to cart
    const firstItemName = await inventoryPage.getFirstItemName();
    console.log(`Adding item to cart: ${firstItemName}`);
    
    await inventoryPage.addFirstItemToCart();

    // Step 3: Verify cart badge shows 1 item
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
    console.log(`Cart badge count: ${cartBadgeCount}`);

    // Step 4: Navigate to cart page
    await inventoryPage.goToCart();
    await cartPage.isLoaded();
    await expect(page).toHaveURL(/.*cart/);

    // Step 5: Verify the item is in the cart
    const isItemInCart = await cartPage.isItemInCart(firstItemName!);
    expect(isItemInCart).toBe(true);
    console.log(`Item "${firstItemName}" is in cart: ${isItemInCart}`);

    // Step 6: Verify cart has exactly 1 item
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);
    console.log(`Total items in cart: ${cartItemCount}`);

    // Step 7: Verify item details in cart
    const itemQuantity = await cartPage.getItemQuantity(firstItemName!);
    expect(itemQuantity).toBe('1');
    console.log(`Item quantity: ${itemQuantity}`);

    const itemPrice = await cartPage.getItemPrice(firstItemName!);
    expect(itemPrice).toBeTruthy();
    console.log(`Item price: ${itemPrice}`);
  });

  test('should handle multiple items in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isLoaded();

    // Add multiple items to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');

    // Verify cart badge shows 3 items
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(3);

    // Go to cart and verify all items
    await inventoryPage.goToCart();
    await cartPage.isLoaded();

    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
    expect(itemNames).toContain('Sauce Labs Bolt T-Shirt');
  });

  test('should handle invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');

    // Verify error message is displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });
});
