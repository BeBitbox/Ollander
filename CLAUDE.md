# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview
Ollander is a project to support Dutch people migrating or working in Belgium, or mainly Flanders. The main language on the website is Dutch.

## Repository Structure

Monorepo with two subprojects:
- `ollander-front/` — Nuxt 4 frontend (Vue 3 + TypeScript)
- `ollander-qa/` — Playwright end-to-end test suite

No backend exists in this repository yet.

## Commands

All commands must be run from within their respective subproject directories.

### Frontend (`ollander-front/`)

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Build for production
npm run preview    # Preview production build
npm run generate   # Pre-render static site
```

### QA (`ollander-qa/`)

```bash
npx playwright test                    # Run all tests (Chromium, Firefox, WebKit)
npx playwright test --project=chromium # Run tests in a single browser
npx playwright test tests/example.spec.ts  # Run a single test file
npx playwright install --with-deps     # Install browsers (first-time setup)
```

## Architecture

### Frontend

The Nuxt 4 app uses the `app/` directory convention (Nuxt 4 default). The entry point is `app/app.vue`. Nuxt auto-generates TypeScript configs under `.nuxt/`; the root `tsconfig.json` references those.

Nuxt config is minimal (`nuxt.config.ts`) — compatibility date `2025-07-15`, devtools enabled.

### QA

Playwright tests live in `ollander-qa/tests/`. The config (`playwright.config.ts`) runs fully parallel locally, single-worker on CI, with 2 retries on CI. A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the suite on push/PR to main/master and uploads the HTML report as an artifact.
