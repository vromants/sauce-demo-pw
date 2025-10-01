import { test as base, chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Define the types for our custom fixtures
type MyFixtures = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
};

// Extend the base test object
export const test = base.extend<MyFixtures>({

    // 1. 'browser' fixture (worker-scoped)
    // This is the foundation. It's created once per worker.
    browser: [async ({}, use) => {
        console.log('Setting up: Launching browser...');
        const browser = await chromium.launch();

        // Provide the browser instance to other fixtures/tests
        await use(browser);

        // Teardown: This runs after all tests in the worker are complete
        console.log('Tearing down: Closing browser...');
        await browser.close();
    }, { scope: 'worker' }],

    // 2. 'context' fixture (test-scoped)
    // It depends on the 'browser' fixture we just defined.
    context: [async ({ browser }, use) => {
        console.log('  Setting up: Creating new browser context...');
        const context = await browser.newContext();

        // Provide the context instance
        await use(context);

        // Teardown: This runs after each test
        console.log('  Tearing down: Closing context...');
        await context.close();
    }, { scope: 'test' }], // Default scope is 'test', but we'll be explicit

    // 3. 'page' fixture (test-scoped)
    // This is the one you use most. It depends on the 'context' fixture.
    page: [async ({ context }, use) => {
        console.log('    Setting up: Creating new page...');
        const page = await context.newPage();

        // Provide the page instance to the actual test function
        await use(page);

        // Teardown: This runs after each test (before the context teardown)
        console.log('    Tearing down: Closing page...');
        await page.close();
    }, { scope: 'test' }],

});

export { expect } from '@playwright/test';