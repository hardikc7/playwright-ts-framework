import { test, expect } from '@playwright/test';
import { ElementPage } from '../pages/ElementPage';

test.describe('Element page exercises', () => {
    let elementPage: ElementPage
  
    test.beforeEach(async ({ page }) => {
      elementPage = new ElementPage(page)
    });
  
    test('Exercise 2 — Checkboxes', async ({ page }) => {
      await elementPage.navigateTo('https://the-internet.herokuapp.com/checkboxes')
  
      // count — locator goes to expect, auto-retry works
      await expect(elementPage.getCheckboxes()).toHaveCount(2)
  
      // check all
      await elementPage.checkAllCheckboxes()
  
      // assert each is checked
      await expect(elementPage.getCheckboxes().nth(0)).toBeChecked()
      await expect(elementPage.getCheckboxes().nth(1)).toBeChecked()
    });
  
    test('Exercise 3 — Add Remove Elements', async ({ page }) => {
      await elementPage.navigateTo('https://the-internet.herokuapp.com/add_remove_elements/')
  
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
  });