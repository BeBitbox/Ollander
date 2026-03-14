import { test, expect } from '@playwright/test';

const API_BASE = 'https://u3qcym3sb0.execute-api.eu-west-3.amazonaws.com';

// Hulpfunctie: mock alle quiz API-calls
async function mockQuizApi(page: Parameters<Parameters<typeof test>[1]>[0]['page'], opties: {
  quizGedaan?: boolean;
  stopSucces?: boolean;
  score?: number;
} = {}) {
  const { quizGedaan = false, stopSucces = true, score = 8 } = opties;

  await page.route(`${API_BASE}/api/init`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ naam: 'Kees Pannekoek', quizGedaan, challenge: 'test1234' }),
    })
  );

  await page.route(`${API_BASE}/api/start`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  );

  await page.route(`${API_BASE}/api/stop`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: stopSucces,
        naam: 'Kees Pannekoek',
        score,
        tijd: 45000,
        plaats: 3,
      }),
    })
  );

  await page.route(`${API_BASE}/api/top`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { naam: 'Kees Pannekoek', score, tijd: 45000, plaats: 1 },
        { naam: 'Jan Modaal', score: 7, tijd: 60000, plaats: 2 },
      ]),
    })
  );
}

test.describe('Quiz sectie zichtbaarheid', () => {
  test.beforeEach(async ({ page }) => {
    await mockQuizApi(page);
    await page.goto('/');
    // Scroll naar quiz sectie
    await page.locator('#quiz').scrollIntoViewIfNeeded();
  });

  test('quiz navigatieknop is zichtbaar', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Quiz/ })).toBeVisible();
  });

  test('quiz kaart is zichtbaar', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Ben jij al een echte Vlaming/ })).toBeVisible();
  });

  test('quiz uitleg is zichtbaar', async ({ page }) => {
    await expect(page.getByText('Hoe werkt de quiz?')).toBeVisible();
  });

  test('naam-invoerveld is zichtbaar en klikbaar', async ({ page }) => {
    const input = page.getByPlaceholder(/Jouw naam/);
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
  });

  test('start-knop is zichtbaar', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Start de quiz/ })).toBeVisible();
  });

  test('top 10 tabel is zichtbaar', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /De Vlaamse Erelijst/ })).toBeVisible();
  });

  test('geen horizontale overflow bij quiz sectie', async ({ page }) => {
    const heeftHorizontaleScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(heeftHorizontaleScroll).toBe(false);
  });

  test('quiz al gedaan: start-knop is uitgeschakeld', async ({ page }) => {
    await page.unroute(`${API_BASE}/api/init`);
    await page.route(`${API_BASE}/api/init`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ naam: 'Kees Pannekoek', quizGedaan: true, challenge: 'test1234' }),
      })
    );
    await page.goto('/');
    await page.locator('#quiz').scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: /Quiz al gedaan/ })).toBeDisabled();
  });
});

test.describe('Quiz happy path', () => {
  test('volledige quiz invullen en resultaat bekijken', async ({ page }) => {
    await mockQuizApi(page, { score: 8 });
    await page.goto('/');

    // Wacht tot de intro fase geladen is
    await page.locator('#quiz').scrollIntoViewIfNeeded();
    await expect(page.getByPlaceholder(/Jouw naam/)).toBeVisible();

    // Vul naam in en start quiz
    const naamVeld = page.getByPlaceholder(/Jouw naam/);
    await naamVeld.fill('Kees Pannekoek');
    await page.getByRole('button', { name: /Start de quiz/ }).click();

    // Beantwoord alle 10 vragen: klik telkens de eerste optie
    for (let i = 0; i < 10; i++) {
      await expect(page.getByText(`Vraag ${i + 1} van 10`)).toBeVisible();
      const eersteOptie = page.getByRole('button', { name: /^A\./ });
      await eersteOptie.click();
    }

    // Resultaat scherm moet verschijnen
    await expect(page.getByText('Jouw antwoorden:')).toBeVisible();

    // Score statistieken zijn zichtbaar (in de statistiekenkaart)
    await expect(page.locator('.text-2xl.font-black', { hasText: '8/10' })).toBeVisible();
    await expect(page.locator('.text-2xl.font-black', { hasText: '45s' })).toBeVisible();
    await expect(page.locator('.text-2xl.font-black', { hasText: '#3' })).toBeVisible();
  });

  test('naam wordt vooringevuld vanuit init API', async ({ page }) => {
    await mockQuizApi(page);
    await page.goto('/');
    await page.locator('#quiz').scrollIntoViewIfNeeded();
    await expect(page.getByPlaceholder(/Jouw naam/)).toHaveValue('Kees Pannekoek');
  });

  test('top 10 toont deelnemers na quiz', async ({ page }) => {
    await mockQuizApi(page, { score: 8 });
    await page.goto('/');
    await page.locator('#quiz').scrollIntoViewIfNeeded();

    // Start en doorloop quiz
    await page.getByRole('button', { name: /Start de quiz/ }).click();
    for (let i = 0; i < 10; i++) {
      await expect(page.getByText(`Vraag ${i + 1} van 10`)).toBeVisible();
      await page.getByRole('button', { name: /^A\./ }).click();
    }

    // Top 10 tabel moet deelnemers tonen
    await expect(page.getByText('Kees Pannekoek').first()).toBeVisible();
    await expect(page.getByText('Jan Modaal')).toBeVisible();
  });
});
