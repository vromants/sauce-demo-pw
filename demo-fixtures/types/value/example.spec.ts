import { test } from './value.fixture';

test('user profile page should show the correct username', async ({ page, testUser }) => {
    // `testUser` is now available as an object!
    await page.goto(`/profile/${testUser.username}`);
    // ... assertions using testUser.username
});