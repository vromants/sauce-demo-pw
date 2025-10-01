import { test as base, expect } from '@playwright/test';

// in fixtures.ts
export const test = base.extend<{ autoCheckConsoleErrors: void }>({
    autoCheckConsoleErrors: [async ({ page }, use) => {
        const errors: string[] = [];

        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await use(); // Run the test

        // After the test, assert that no errors were collected
        expect(errors).toEqual([]);

    }, { auto: true }], // The magic `auto` flag!
});