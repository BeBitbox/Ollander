import { test, expect } from '@playwright/test';

const CONSENT_KEY = 'ollander_consent';
const JURIDISCHE_PAGINAS = ['/privacyverklaring', '/disclaimer'];
const ALLE_PAGINAS = ['/', ...JURIDISCHE_PAGINAS];

// ─── Stap 2: Juridische pagina's ─────────────────────────────────────────────

test.describe("Juridische pagina's", () => {
  for (const pad of JURIDISCHE_PAGINAS) {
    test(`${pad} geeft HTTP 200 terug`, async ({ page }) => {
      const response = await page.goto(pad);
      expect(response?.status()).toBe(200);
    });

    test(`${pad} heeft een h1 met relevante tekst`, async ({ page }) => {
      await page.goto(pad);
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      await expect(h1).not.toBeEmpty();
    });

    test(`${pad} heeft de juiste paginatitel`, async ({ page }) => {
      await page.goto(pad);
      const trefwoord = pad === '/privacyverklaring'
        ? 'Privacyverklaring'
        : 'Disclaimer';
      await expect(page).toHaveTitle(new RegExp(trefwoord, 'i'));
    });
  }
});

// ─── Stap 3: Footer ──────────────────────────────────────────────────────────

test.describe('Footer links en cookievoorkeuren', () => {
  test.beforeEach(async ({ page }) => {
    // Zorg dat de banner al eerder is weggewerkt zodat ze niet stoort
    await page.goto('/');
    await page.evaluate(
      ({ key, val }) => localStorage.setItem(key, val),
      { key: CONSENT_KEY, val: JSON.stringify({ consent: false }) }
    );
  });

  for (const pad of ALLE_PAGINAS) {
    test(`footer op ${pad || '/'} bevat links naar alle juridische pagina's`, async ({ page }) => {
      await page.goto(pad || '/');
      const footer = page.locator('footer');
      await expect(footer.getByRole('link', { name: /privacyverklaring/i })).toBeVisible();
      await expect(footer.getByRole('link', { name: /disclaimer/i })).toBeVisible();
    });

    test(`knop "Cookievoorkeuren aanpassen" op ${pad || '/'} toont cookiebanner opnieuw`, async ({ page }) => {
      await page.goto(pad || '/');
      const footer = page.locator('footer');
      const knop = footer.getByRole('button', { name: /cookievoorkeuren aanpassen/i });
      await expect(knop).toBeVisible();

      await Promise.all([
        page.waitForURL(page.url()),
        knop.click(),
      ]);

      // Na reload moet de banner zichtbaar zijn (consent verwijderd)
      await expect(page.getByText('Wij gebruiken cookies')).toBeVisible();
    });
  }
});

// ─── Stap 4: SEO-meta-tags op de startpagina ─────────────────────────────────

test.describe('SEO-meta-tags op de startpagina', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('meta description aanwezig met inhoud', async ({ page }) => {
    const content = await page.getAttribute('meta[name="description"]', 'content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(10);
  });

  test('og:title aanwezig met inhoud', async ({ page }) => {
    const content = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(content).toBeTruthy();
  });

  test('og:image aanwezig met inhoud', async ({ page }) => {
    const content = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(content).toBeTruthy();
  });

  test('canonical link aanwezig met URL', async ({ page }) => {
    const href = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//);
  });
});

// ─── Stap 5: robots.txt ──────────────────────────────────────────────────────

test.describe('robots.txt', () => {
  test('bevat Disallow: /api/', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const tekst = await page.content();
    expect(tekst).toContain('Disallow: /api/');
  });

  test('bevat Sitemap: regel', async ({ page }) => {
    await page.goto('/robots.txt');
    const tekst = await page.content();
    expect(tekst).toContain('Sitemap:');
  });
});

// ─── Stap 6: 404-foutpagina ──────────────────────────────────────────────────

test.describe('404-foutpagina', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bestaat-niet');
  });

  test('toont de foutcode 404', async ({ page }) => {
    await expect(page.getByText('404')).toBeVisible();
  });

  test('bevat een link of knop naar de startpagina', async ({ page }) => {
    // error.vue gebruikt clearError met redirect — zoek op knoptekst
    const terugKnop = page.getByRole('button', { name: /terug naar de startpagina/i });
    await expect(terugKnop).toBeVisible();
  });

  test('klikken op terug-knop navigeert naar startpagina', async ({ page }) => {
    await page.getByRole('button', { name: /terug naar de startpagina/i }).click();
    await expect(page).toHaveURL('/');
  });
});

// ─── Stap 7: html lang attribuut ─────────────────────────────────────────────

test.describe('HTML lang attribuut', () => {
  test('startpagina heeft lang="nl"', async ({ page }) => {
    await page.goto('/');
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBe('nl');
  });
});

// ─── Stap 8: Manifest en favicon ─────────────────────────────────────────────

test.describe('Manifest en favicon in <head>', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('link rel="manifest" aanwezig in head', async ({ page }) => {
    const href = await page.getAttribute('link[rel="manifest"]', 'href');
    expect(href).toBeTruthy();
  });

  test('link rel="icon" aanwezig in head', async ({ page }) => {
    const href = await page.getAttribute('link[rel="icon"]', 'href');
    expect(href).toBeTruthy();
  });
});
