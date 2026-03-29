import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InfiniteScrollPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly url: string = 'https://the-internet.herokuapp.com/infinite_scroll';

    private heading = this.page.getByRole('heading', { name: 'Infinite Scroll' })
    private contentItems: Locator = this.page.locator('.jscroll-added');

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
