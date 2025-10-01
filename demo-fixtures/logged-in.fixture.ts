import { test as base, Page } from '@playwright/test';

type MyFixtures = {
    loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
    // The `{ scope: 'worker' }` option is key!
    // `auto: true` means every test will automatically use this fixture.
    loggedInPage: [async ({ browser }, use) => {
        // This setup runs only ONCE per worker
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('/login');
        await page.fill('input[name="username"]', 'testUser');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        console.log('Logged in once for the worker!');

        // The test receives the logged-in page
        await use(page);

        // This teardown runs after all tests in the worker are done
        console.log('Logging out now...');
        // Add logout logic here if needed, or just close context
        await context.close();
    }, { scope: 'worker' }],
});