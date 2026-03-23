import { test, expect } from '@playwright/test';
import { InfiniteScrollPage } from '../pages/InfiniteScrollPage';

test.describe('Infinite Scroll page exercises', () => {
  let infiniteScrollPage: InfiniteScrollPage;

  test.beforeEach(async ({ page }) => {
    infiniteScrollPage = new InfiniteScrollPage(page);
  });

  // TC-001: Verify initial content loads when page opens
  test('TC-001 — Verify initial content loads when page opens', async () => {
    await infiniteScrollPage.navigate();

    await expect(infiniteScrollPage.getHeading()).toBeVisible();
    await expect(infiniteScrollPage.getHeading()).toHaveText('Infinite Scroll');

    await expect(infiniteScrollPage.getContentItems().first()).toBeVisible();
  });

  // TC-002: Verify more content loads after scrolling down
  test('TC-002 — Verify more content loads after scrolling down', async ({ page }) => {
    await infiniteScrollPage.navigate();

    const initialCount = await infiniteScrollPage.getContentItems().count();

    await infiniteScrollPage.scrollToBottom();

    await expect(infiniteScrollPage.getContentItems()).toHaveCount(initialCount + 1, { timeout: 10000 });
  });
});
