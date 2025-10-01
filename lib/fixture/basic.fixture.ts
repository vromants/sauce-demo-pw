import { test as base } from '@playwright/test';
import { PageManager } from '../page.manager';

type BasicFixture = {
  app: PageManager;
};

export const test = base.extend<BasicFixture>({
  app: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect } from '@playwright/test';
