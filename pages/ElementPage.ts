import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElementPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    private readonly checkboxesUrl: string = 'https://the-internet.herokuapp.com/checkboxes';
    private readonly addRemoveUrl: string = 'https://the-internet.herokuapp.com/add_remove_elements/';
    private checkboxes = this.page.locator('#checkboxes input[type="checkbox"]')
    private addElementBtn = this.page.getByRole('button', { name: 'Add Element' })
    private deleteButtons = this.page.locator('#elements button[class="added-manually"]');

    getCheckboxes(): Locator {
        return this.checkboxes
    }

    getDeleteButtons(): Locator {
        return this.deleteButtons
    }

    async navigateToCheckboxes(): Promise<void> {
        await this.goToUrl(this.checkboxesUrl);
    }

    async navigateToAddRemove(): Promise<void> {
        await this.goToUrl(this.addRemoveUrl);
    }

    async clickAddElement(): Promise<void> {
        await this.click(this.addElementBtn)
    }
    async checkAllCheckboxes(): Promise<void> {
        const count = await this.checkboxes.count();
        for (let i = 0; i < count; i++) {
            await this.check(this.checkboxes.nth(i));
        }
    }

}