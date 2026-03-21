import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly urlPath: string = '/practice-test-login/';

    constructor(page: Page) {
        super(page);
    }

    private emailInput: Locator = this.page.locator('#username');
    private passwordInput: Locator = this.page.locator('#password');
    private loginButton: Locator = this.page.locator('#submit');
    private logoutLink: Locator = this.page.locator('.wp-block-button__link');
    private errorMessage: Locator = this.page.locator('#error');

    async navigateTo(): Promise<void> {
        await this.goToUrl(this.urlPath);
    }

    async login(email: string, password: string): Promise<void> {
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async clickLogout(): Promise<void> {
        await this.click(this.logoutLink);
    }

    async isLoginSuccessful(): Promise<boolean> {
        return await this.isVisible(this.logoutLink);
    }

    async isLogoutSuccessful(): Promise<boolean> {
        return await this.isVisible(this.loginButton);
    }

    async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessage);
    }
}