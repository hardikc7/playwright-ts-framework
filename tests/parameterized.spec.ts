import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
const loginData = require('../test-data/loginData.json');

test.describe('Parameterized Tests', () => {
  for (const testCase of loginData.testCases) {
    test(`${testCase.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage= new DashboardPage(page); 
      await loginPage.navigateTo();
      await loginPage.login(testCase.email, testCase.password);

      if (testCase.shouldSucceed) {
        const isLoaded = await dashboardPage.isPageLoaded();
        expect(isLoaded).toBeTruthy();
        const message = await dashboardPage.getWelcomeMessage();
        expect(message).toContain(testCase.expectedMessage);
      } else {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(testCase.expectedMessage);
      }
    });
  }
});
