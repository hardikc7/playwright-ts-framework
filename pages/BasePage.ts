import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }
    async check(locator: Locator): Promise<void> {
        await locator.check();
    }
    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }
    async selectOption(locator: Locator, value: string): Promise<void>{
        await locator.selectOption({label: value});
    }

    async getText(locator: Locator): Promise<string> {
        return await locator.innerText();
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}