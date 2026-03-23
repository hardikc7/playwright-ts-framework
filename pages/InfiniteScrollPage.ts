import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InfiniteScrollPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly url: string = 'https://the-internet.herokuapp.com/infinite_scroll';

    private heading = this.page.locator('h3');
    private contentItems = this.page.locator('.jscroll-inner div');

    getHeading(): Locator {
        return this.heading;
    }

    getContentItems(): Locator {
        return this.contentItems;
    }

    async navigate(): Promise<void> {
        await this.goToUrl(this.url);
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
}
