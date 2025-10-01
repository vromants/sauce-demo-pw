# Sauce Demo - Playwright Tests

This project contains Playwright end-to-end tests for the Sauce Demo application.

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm

### Installation
```bash
npm install
```

### Running Tests

#### Run all tests
```bash
npm test
```

#### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

#### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

#### Debug tests
```bash
npm run test:debug
```

#### View test report
```bash
npm run test:report
```

## Project Structure

```
sauce-demo/
├── tests/                    # Test files
│   └── example.spec.ts      # Sample test file
├── playwright.config.ts     # Playwright configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Writing Tests

Tests are written in TypeScript and located in the `tests/` directory. Each test file should end with `.spec.ts`.

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test('test name', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Configuration

The Playwright configuration is in `playwright.config.ts`. You can modify:
- Test directory location
- Browser configurations
- Test timeouts
- Reporter settings
- And more

## Browser Support

Tests run on:
- Chromium
- Firefox
- WebKit (Safari)

## Test Reports

After running tests, you can view detailed HTML reports by running:
```bash
npm run test:report
```

This will open the test report in your browser showing test results, screenshots, and traces.

