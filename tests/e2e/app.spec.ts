import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="splash-screen"]')).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL('/login');
  });
});