import { test, expect } from '@playwright/test';
import { ElementPage } from '../pages/ElementPage';

test.describe('Element page exercises', () => {
  let elementPage: ElementPage

  test.beforeEach(async ({ page }) => {
    elementPage = new ElementPage(page)
  });

  test('Exercise 1 — Checkboxes', async () => {
    await elementPage.navigateToCheckboxes();

    // count — locator goes to expect, auto-retry works
    await expect(elementPage.getCheckboxes()).toHaveCount(2)

    // check all
    await elementPage.checkAllCheckboxes()
    // assert each is checked
    const checkboxes = elementPage.getCheckboxes();
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).toBeChecked();
    }

  });

  test('Exercise 2 — Add Remove Elements', async () => {
    await elementPage.navigateToAddRemove();
    // click 3 times
    await elementPage.clickAddElement()
    await elementPage.clickAddElement()
    await elementPage.clickAddElement()

    // assert 3 delete buttons
    await expect(elementPage.getDeleteButtons()).toHaveCount(3)

    // click first delete
    await elementPage.getDeleteButtons().first().click()

    // assert 2 remain
    await expect(elementPage.getDeleteButtons()).toHaveCount(2)
  });

  test('Exercise 3 — Select DropDownValues', async () => {
    await elementPage.navigateToDropDown();
    await elementPage.selectDropDownValue('Option 1')
    await expect(elementPage.getDropDownMenu()).toHaveValue('1');
    await elementPage.selectDropDownValue('Option 2')
    await expect(elementPage.getDropDownMenu()).toHaveValue('2');
    await expect(elementPage.getDropDownMenu()).not.toHaveValue('1');
  });

  // --- Table Tests ---
  test('Exercise 4 — verify both tables have rows', async () => {
    await elementPage.navigateToTables();
    const table1 = await elementPage.getAllTableData(1);
    const table2 = await elementPage.getAllTableData(2);
    expect(table1.length).toBeGreaterThan(0);
    expect(table2.length).toBeGreaterThan(0);
  });

  test('Exercise 5 — print all data from both tables', async () => {
    await elementPage.navigateToTables();
    for (const tableId of [1, 2]) {
      const data = await elementPage.getAllTableData(tableId);
      console.log(`\n--- Table ${tableId} ---`);
      console.table(data);
    }
  });

  test('Exercise 6 — find row by last name "Smith" in table 1 and assert email not empty', async () => {
    await elementPage.navigateToTables();
    const row = await elementPage.findRowByValue('Smith', 1);
    expect(row).toContain('Smith');
    expect(row).toContain('jsmith@gmail.com');
  });

  // --- Window Tests ---
  test('Exercise 7 — click open new window, verify new page title', async ({ context }) => {
    await elementPage.navigateToWindows();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      elementPage.clickOpenNewWindow(),
    ]);
    await newPage.waitForLoadState();
    expect(await newPage.title()).toBe('New Window');
  });

  test('Exercise 8 — verify original window still accessible after new window opens', async ({ context }) => {
    await elementPage.navigateToWindows();
    const originalTitle = await elementPage.getTitle();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      elementPage.clickOpenNewWindow(),
    ]);
    await newPage.waitForLoadState();
    expect(await elementPage.getTitle()).toBe(originalTitle);
  });

  // --- Drag and Drop Tests ---
  test('Exercise 9 — verify initial state A=A B=B', async () => {
    await elementPage.navigateToDragDrop();
    expect(await elementPage.getColumnAHeader()).toBe('A');
    expect(await elementPage.getColumnBHeader()).toBe('B');
  });

  test('Exercise 10 — drag A to B, verify columns swapped', async () => {
    await elementPage.navigateToDragDrop();
    await elementPage.dragAtoB();
    expect(await elementPage.getColumnAHeader()).toBe('B');
    expect(await elementPage.getColumnBHeader()).toBe('A');
  });
});