import { test, expect } from '@playwright/test';

test.describe('Startpagina zichtbaarheid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('paginatitel bevat ollander.be', async ({ page }) => {
    await expect(page).toHaveTitle(/ollander\.be/);
  });

  test('hoofdtitel is zichtbaar', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Welkom in Vlaanderen, ollander!/ })
    ).toBeVisible();
  });

  test('taalwoordenboek sectie is zichtbaar', async ({ page }) => {
    await expect(page.getByText('Het Grote Ollandse Woordenboek')).toBeVisible();
  });

  test("do's en don'ts sectie is zichtbaar", async ({ page }) => {
    await expect(page.getByText("Do's & Don'ts")).toBeVisible();
  });

  test('eten en drinken sectie is zichtbaar', async ({ page }) => {
    await expect(page.getByText('Eten & Drinken Survival Gids')).toBeVisible();
  });

  test('geen horizontale overflow op mobiel', async ({ page }) => {
    const heeftHorizontaleScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(heeftHorizontaleScroll).toBe(false);
  });

  test('footer is zichtbaar na scrollen naar beneden', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('Geen Hollanders werden gekwetst').first()).toBeVisible();
  });
});
