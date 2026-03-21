import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
const loginData = require('../test-data/loginData.json');

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateTo();
  });

  test('valid login should show success message', async () => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);

    const isLoaded = await dashboardPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    const message = await dashboardPage.getWelcomeMessage();
    expect(message).toContain(loginData.validUser.expectedMessage);
  });

  test('invalid login show error message', async () =>{
    await loginPage.login(loginData.invalidUser.email,loginData.invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(loginData.invalidUser.expectedMessage);
  });

  test('successful login then logout', async () => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);
    const isLoaded = await dashboardPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    await loginPage.clickLogout();
    expect(await loginPage.isLogoutSuccessful()).toBeTruthy();
  });
});


