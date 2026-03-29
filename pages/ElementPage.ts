import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElementPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    private readonly checkboxesUrl: string = 'https://the-internet.herokuapp.com/checkboxes';
    private readonly addRemoveUrl: string = 'https://the-internet.herokuapp.com/add_remove_elements/';
    private readonly dropDownUrl: string = 'https://the-internet.herokuapp.com/dropdown';
    private readonly tablesUrl: string = 'https://the-internet.herokuapp.com/tables';
    private readonly windowsUrl: string = 'https://the-internet.herokuapp.com/windows';
    private readonly dragDropUrl: string = 'https://the-internet.herokuapp.com/drag_and_drop';

    private checkboxes = this.page.locator('#checkboxes input[type="checkbox"]')
    private addElementBtn = this.page.getByRole('button', { name: 'Add Element' })
    private deleteButtons = this.page.locator('#elements button[class="added-manually"]');
    private dropDownMenu = this.page.locator('#dropdown');
    private openNewWindowLink = this.page.locator('a', { hasText: 'Click Here' });
    private columnA = this.page.locator('#column-a');
    private columnB = this.page.locator('#column-b');
    
    getCheckboxes(): Locator {
        return this.checkboxes
    }

    getDeleteButtons(): Locator {
        return this.deleteButtons
    }

    getDropDownMenu(): Locator{
        return this.dropDownMenu;
    }

    async navigateToCheckboxes(): Promise<void> {
        await this.goToUrl(this.checkboxesUrl);
    }
    async navigateToDropDown(): Promise<void> {
        await this.goToUrl(this.dropDownUrl);
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
    async selectDropDownValue(value: string): Promise<void>{
        await this.selectOption(this.dropDownMenu, value);
    }

    // --- Tables ---
    async navigateToTables(): Promise<void> {
        await this.goToUrl(this.tablesUrl);
    }

    private tableRows(tableId: number): Locator {
        return this.page.locator(`#table${tableId} tbody tr`);
    }

    async getAllTableData(tableId: number = 1): Promise<string[][]> {
        const rows = this.tableRows(tableId);
        const rowCount = await rows.count();
        const tableData: string[][] = [];
        for (let i = 0; i < rowCount; i++) {
            tableData.push(await rows.nth(i).locator('td').allInnerTexts());
        }
        return tableData;
    }

    async findRowByValue(searchValue: string, tableId: number = 1): Promise<string[]> {
        const row = this.tableRows(tableId)
            .filter({ has: this.page.locator('td', { hasText: searchValue }) });
        return await row.first().locator('td').allInnerTexts();
    }

    // --- Windows ---
    async navigateToWindows(): Promise<void> {
        await this.goToUrl(this.windowsUrl);
    }

    async clickOpenNewWindow(): Promise<void> {
        await this.click(this.openNewWindowLink);
    }

    // --- Drag and Drop ---
    async navigateToDragDrop(): Promise<void> {
        await this.goToUrl(this.dragDropUrl);
    }

    async getColumnAHeader(): Promise<string> {
        return await this.columnA.locator('header').innerText();
    }

    async getColumnBHeader(): Promise<string> {
        return await this.columnB.locator('header').innerText();
    }

    async dragAtoB(): Promise<void> {
        await this.columnA.dragTo(this.columnB);
    }

}