# Playwright TypeScript Framework

Production-grade E2E test automation framework built with Playwright and TypeScript following Page Object Model design pattern.

![CI](https://github.com/hardikc7/playwright-ts-framework/actions/workflows/ci.yml/badge.svg)

## Tech Stack

- TypeScript
- Playwright
- Node.js 18
- GitHub Actions CI/CD

## Framework Structure
```
playwright-ts-framework/
├── pages/
│   ├── BasePage.ts          # Shared Playwright actions (click, fill, check, getText, isVisible)
│   ├── LoginPage.ts         # Login page — locators, actions, urlPath
│   ├── DashboardPage.ts     # Dashboard page — success message verification
│   └── ElementPage.ts       # Checkboxes and Add/Remove elements page
├── tests/
│   ├── login.spec.ts        # Login test suite
│   └── element.spec.ts      # Element interaction test suite
├── test-data/
│   └── loginData.json       # External test credentials and expected messages
├── utils/
│   └── ConfigReader.ts      # Environment-based config loader
├── config/
│   └── dev.json             # Dev environment config (baseUrl, browser)
├── .github/workflows/
│   └── ci.yml               # GitHub Actions pipeline
└── playwright.config.ts     # Playwright configuration
```

## Design Decisions

- **Page Object Model** — locators and actions owned by page classes, zero test logic in pages
- **Locator type over string** — fields typed as `Locator` for Playwright auto-retry and smart waiting
- **Semantic locators** — `getByRole`, `getByLabel`, `locator('#id')` used in priority order
- **Page owns its URL** — each page class holds its own `urlPath`, tests never hardcode URLs
- **Secondary sites use full URL** — `ElementPage` tests a different domain, full URL hardcoded in page class
- **Environment config** — `config/dev.json` drives `baseUrl`, loaded via `ConfigReader`
- **Headless auto-detect** — headed locally, headless in CI via `process.env.CI`
- **Video on CI** — `video: 'on'` in CI for debugging failures, off locally
- **SlowMo support** — `SLOWMO=500 npx playwright test` slows execution for debugging
- **`beforeEach` initialization** — page objects created once per describe block, not per test
- **Built-in HTML reporter** — no third-party reporting library needed

## Setup
```bash
npm install
npx playwright install chromium
```

## Run Tests
```bash
# All tests
npx playwright test

# Single test file
npx playwright test tests/login.spec.ts

# With browser visible
npx playwright test --headed

# Slow motion for debugging
SLOWMO=500 npx playwright test --headed

# Specific environment
ENV=staging npx playwright test

# View HTML report
npx playwright show-report
```

## Test Coverage

### Login Tests — `practicetestautomation.com`

| Test | Status |
|------|--------|
| Valid login shows success message | ✅ |
| Invalid login shows error message | ✅ |
| Successful login then logout | ✅ |

### Element Tests — `the-internet.herokuapp.com`

| Test | Status |
|------|--------|
| Checkboxes — verify count and check all | ✅ |
| Add/Remove elements — add 3, delete 1, verify count | ✅ |

## CI/CD

GitHub Actions triggers on every push to `main`:
- Installs Node.js 18 and Playwright Chromium
- Runs full test suite headless
- Records video for every test run
- Uploads HTML report and videos as artifacts