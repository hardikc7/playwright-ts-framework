import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private welcomeMessage = this.page.locator('.post-title');

    async getWelcomeMessage(): Promise<string> {
        return await this.getText(this.welcomeMessage);
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.isVisible(this.welcomeMessage);
    }
}