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
});