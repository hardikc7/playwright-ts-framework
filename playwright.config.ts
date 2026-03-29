import { defineConfig, devices } from '@playwright/test';
import { ConfigReader } from './utils/ConfigReader';

const env = process.env.ENV || 'dev';
ConfigReader.load(env);

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: process.env.CI ? 2 : 4,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: ConfigReader.get('baseUrl'),
    headless: process.env.CI ? true : false,
    video: process.env.CI ? 'on' : 'off',           // record video only on CI
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});