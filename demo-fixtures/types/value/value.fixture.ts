import { test as base } from '@playwright/test';

type TestData = {
    testUser: {
        username: string;
        email: string;
        isAdmin: boolean;
    };
};

export const test = base.extend<TestData>({
    testUser: async ({}, use) => {
        // This could fetch data from a file or just define it here
        await use({
            username: 'JohnDoe',
            email: `john.doe.${Date.now()}@example.com`, // Unique email for each test
            isAdmin: false,
        });
    },
});