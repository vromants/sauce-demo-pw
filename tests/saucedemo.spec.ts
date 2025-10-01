import { test, expect } from '../lib/fixture/basic.fixture';

test.describe('Sauce Demo E2E Tests', () => {
  test('should login, add item to cart, and verify item in cart', async ({ app }) => {
    const { inventoryPage, cartPage } = app;

    await inventoryPage.goto();
    // Verify we're on the inventory page
    await inventoryPage.isLoaded();

    // Step 2: Get the name of the first item and add it to cart
    const firstItemName = await inventoryPage.getFirstItemName();

    await inventoryPage.addFirstItemToCart();

    // Step 3: Verify cart badge shows 1 item
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);

    // Step 4: Navigate to cart page
    await inventoryPage.goToCart();
    await cartPage.isLoaded();

    // Step 5: Verify the item is in the cart
    const isItemInCart = await cartPage.isItemInCart(firstItemName!);
    expect(isItemInCart).toBe(true);

    // Step 6: Verify cart has exactly 1 item
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    // Step 7: Verify item details in cart
    const itemQuantity = await cartPage.getItemQuantity(firstItemName!);
    expect(itemQuantity).toBe('1');

    const itemPrice = await cartPage.getItemPrice(firstItemName);
    expect(itemPrice).toBeTruthy();
  });

  test('should handle multiple items in cart', async ({ app }) => {
    const { inventoryPage, cartPage } = app;

    await inventoryPage.goto();
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
});
