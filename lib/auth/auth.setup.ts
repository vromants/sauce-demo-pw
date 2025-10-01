import { test as setup, expect } from '../fixture/basic.fixture';

const authFile = '.auth-state/user.json';

setup('authenticate', async ({ app: { loginPage, inventoryPage } }) => {
  // Perform authentication steps
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Wait for the inventory page to load to ensure login was successful
  await expect(inventoryPage.page).toHaveURL(/.*inventory/);

  // End of authentication steps.
  await inventoryPage.page.context().storageState({ path: authFile });
});
