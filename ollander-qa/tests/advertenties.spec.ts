import { test, expect, devices } from '@playwright/test';

const CONSENT_KEY = 'ollander_consent';

test.describe('Cookiebanner weergave', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);
    await page.reload();
  });

  test('cookiebanner is zichtbaar zonder opgeslagen toestemming', async ({ page }) => {
    await expect(page.getByText('Wij gebruiken cookies')).toBeVisible();
  });

  test('geen ins.adsbygoogle elementen zichtbaar zolang toestemming ontbreekt', async ({ page }) => {
    const insElementen = page.locator('ins.adsbygoogle');
    await expect(insElementen).toHaveCount(0);
  });
});

test.describe('Toestemming weigeren', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);
    await page.reload();
  });

  test('banner verdwijnt na klikken op Weigeren', async ({ page }) => {
    await page.getByRole('button', { name: 'Weigeren' }).click();
    await expect(page.getByText('Wij gebruiken cookies')).not.toBeVisible();
  });

  test('localStorage bevat consent false na weigeren', async ({ page }) => {
    await page.getByRole('button', { name: 'Weigeren' }).click();
    const waarde = await page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY);
    expect(waarde).toBe(JSON.stringify({ consent: false }));
  });

  test('geen advertentieblokken zichtbaar na weigeren', async ({ page }) => {
    await page.getByRole('button', { name: 'Weigeren' }).click();
    const insElementen = page.locator('ins.adsbygoogle');
    await expect(insElementen).toHaveCount(0);
  });
});

test.describe('Toestemming geven', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);
    await page.reload();
  });

  test('banner verdwijnt na klikken op Akkoord', async ({ page }) => {
    await page.getByRole('button', { name: 'Akkoord' }).click();
    await expect(page.getByText('Wij gebruiken cookies')).not.toBeVisible();
  });

  test('localStorage bevat consent true na akkoord', async ({ page }) => {
    await page.getByRole('button', { name: 'Akkoord' }).click();
    const waarde = await page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY);
    expect(waarde).toBe(JSON.stringify({ consent: true }));
  });

  test('ins.adsbygoogle elementen aanwezig in DOM na akkoord', async ({ page }) => {
    await page.getByRole('button', { name: 'Akkoord' }).click();
    const insElementen = page.locator('ins.adsbygoogle');
    await expect(insElementen).not.toHaveCount(0);
  });
});

test.describe('Persistentie van toestemming', () => {
  test('cookiebanner verschijnt niet als toestemming al is opgeslagen', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(
      ({ key, waarde }) => localStorage.setItem(key, waarde),
      { key: CONSENT_KEY, waarde: JSON.stringify({ consent: true }) }
    );
    await page.goto('/');
    await expect(page.getByText('Wij gebruiken cookies')).not.toBeVisible();
  });

  test('cookiebanner verschijnt niet als toestemming geweigerd is opgeslagen', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(
      ({ key, waarde }) => localStorage.setItem(key, waarde),
      { key: CONSENT_KEY, waarde: JSON.stringify({ consent: false }) }
    );
    await page.goto('/');
    await expect(page.getByText('Wij gebruiken cookies')).not.toBeVisible();
  });
});

test.describe('Layout op mobiele formaten', () => {
  const mobieleFormaten = [
    { naam: 'iPhone SE', breedte: 375, hoogte: 667 },
    { naam: 'Pixel 5', breedte: 393, hoogte: 851 },
    { naam: 'Galaxy S9+', breedte: 412, hoogte: 846 },
  ];

  for (const formaat of mobieleFormaten) {
    test(`geen advertentie overlapt navigatie boven de vouwlijn op ${formaat.naam}`, async ({ page }) => {
      await page.setViewportSize({ width: formaat.breedte, height: formaat.hoogte });
      await page.goto('/');
      await page.evaluate(
        ({ key, waarde }) => localStorage.setItem(key, waarde),
        { key: CONSENT_KEY, waarde: JSON.stringify({ consent: true }) }
      );
      await page.reload();

      const nav = page.locator('nav').first();
      const navBox = await nav.boundingBox();
      const insElementen = page.locator('ins.adsbygoogle');
      const aantal = await insElementen.count();

      for (let i = 0; i < aantal; i++) {
        const insBox = await insElementen.nth(i).boundingBox();
        if (!insBox || !navBox) continue;
        // Advertentie mag navigatie niet overlappen
        const overlapt =
          insBox.y < navBox.y + navBox.height &&
          insBox.y + insBox.height > navBox.y;
        expect(overlapt, `Advertentie ${i} overlapt de navigatiebalk op ${formaat.naam}`).toBe(false);
      }
    });

    test(`geen horizontale overflow op ${formaat.naam}`, async ({ page }) => {
      await page.setViewportSize({ width: formaat.breedte, height: formaat.hoogte });
      await page.goto('/');
      const heeftHorizontaleScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(heeftHorizontaleScroll).toBe(false);
    });
  }
});
