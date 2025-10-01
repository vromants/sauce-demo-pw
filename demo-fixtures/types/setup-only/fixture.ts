import { test as base } from '@playwright/test';
import { ToDoAPI } from './my-api-utils'; // Fictional API utility
const api = new ToDoAPI();
// We declare that the fixture provides `void`
export const test = base.extend<{ todoPageWithItems: void }>({
    todoPageWithItems: async ({ page }, use) => {
        // SETUP: Add items to a database or via API
        await api.addTodo('Buy milk');

        // The test runs here. No value is passed to `use()`.
        await use();

        // TEARDOWN: Clean up the database
        await api.cleanupTodos();
    },
});

// Using it signals the need for the setup
test('a test that needs pre-existing data', async ({ page, todoPageWithItems }) => {
    // The to-do item is already there
});