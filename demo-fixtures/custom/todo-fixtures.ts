import { test as base } from '@playwright/test';
import { ToDoAPI } from './my-api-utils'; // Fictional API utility

// Extend the base test object with our new fixture
export const test = base.extend<{ todoPageWithItems: void }>({

    // The fixture name is the key: `todoPageWithItems`
    todoPageWithItems: async ({ page }, use) => {
        // 1. SETUP part: Runs before your test
        const todoAPI = new ToDoAPI();
        await todoAPI.addTodo('Buy milk');
        await todoAPI.addTodo('Read a book');

        // 2. USE keyword: This pauses the fixture and runs your test
        // The test gets access to anything passed into `use()`.
        // In this case, we're not passing a value, just performing setup actions.
        await use();

        // 3. TEARDOWN part: Runs after your test, even if it fails
        await todoAPI.cleanupTodos();
    },
});

export { expect } from '@playwright/test';