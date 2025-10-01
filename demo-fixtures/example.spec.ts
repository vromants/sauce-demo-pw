// Import from our new fixtures file!
import { test, expect } from './todo-fixtures';

test('should allow me to check off an item', async ({ page, todoPageWithItems }) => {
    // Because `todoPageWithItems` is used, its setup code has already run.
    // The two to-do items already exist!

    await page.goto('/todos');

    // Find the 'Buy milk' item and check it
    const milkItem = page.getByText('Buy milk');
    await milkItem.locator('input[type="checkbox"]').check();

    // Assert it's marked as completed
    await expect(milkItem).toHaveClass('completed');
});