# Spec 004: Productieklaar

## Doel
De website moet voldoen aan alle technische, juridische en kwalitatieve vereisten om veilig en verantwoord in productie te gaan voor een Belgisch/Nederlands publiek.
Dit omvat: juridisch verplichte pagina's (privacyverklaring, cookiebeleid, disclaimer), volledige SEO-optimalisatie (sitemap, robots.txt, Open Graph, gestructureerde data), een merkwaardige 404-foutpagina, een favicon en een web app manifest, en een lighthouse-score van minimaal 90 op alle categorieën.
De website richt zich op Nederlanders in Vlaanderen en valt volledig onder de GDPR en de Belgische privacywetgeving.

## Notities
* De privacyverklaring moet de verwerking van persoonsgegevens beschrijven die momenteel plaatsvindt: Google AdSense (gepersonaliseerde advertenties), `localStorage` voor cookietoestemming, en eventuele toekomstige analytics
* Verwijs in de cookiebanner (`CookieBanner.vue`) naar de privacyverklaring en het cookiebeleid
* De sitemap moet dynamisch gegenereerd worden via Nuxt's `@nuxtjs/sitemap`-module of via een server route, zodat nieuwe pagina's automatisch worden opgenomen
* `robots.txt` mag alle crawlers toelaten maar moet het pad `/api/` uitsluiten
* Open Graph-tags moeten per pagina overschrijfbaar zijn via `useSeoMeta()` in de pagina-component
* De 404-pagina moet in dezelfde huisstijl zijn als de rest van de website (oranje/geel, grappige toon)
* Favicon en manifest moeten verwijzen naar het juiste merk/kleur (`#f97316` oranje)
* Houd de lighthouse-score in de gaten bij elke stap: gebruik `npm run build && npm run preview` om de productieversie te testen
* Alle juridische pagina's worden in het Nederlands geschreven; formele maar toegankelijke schrijfstijl
* De footer op elke pagina moet links bevatten naar: Privacyverklaring, Cookiebeleid en Disclaimer

## Taken

### Taak 1
Maak de juridische pagina's aan en verbind ze met de rest van de website:
* Stap 1: Maak `app/pages/privacyverklaring.vue`
  * Schrijf een GDPR-conforme privacyverklaring die de volgende verwerkingen beschrijft:
    * Cookies en `localStorage` voor cookietoestemming (grondslag: toestemming)
    * Google AdSense voor gepersonaliseerde advertenties (grondslag: toestemming; verwerkingsverantwoordelijke: Google Ireland Ltd.)
  * Vermeld de contactgegevens van de verwerkingsverantwoordelijke (placeholder: `[NAAM]`, `[E-MAIL]`)
  * Gebruik `useSeoMeta()` om titel en beschrijving in te stellen
* Stap 2: Maak `app/pages/cookiebeleid.vue`
  * Beschrijf welke cookies en `localStorage`-sleutels worden gebruikt (`ollander_consent`)
  * Leg uit hoe de gebruiker toestemming kan intrekken (banner opnieuw tonen via knop in footer)
  * Verwijs naar de Google AdSense-cookielijst
  * Gebruik `useSeoMeta()` om titel en beschrijving in te stellen
* Stap 3: Maak `app/pages/disclaimer.vue`
  * Beschrijf de beperkte aansprakelijkheid voor de inhoud (informatief, geen juridisch advies)
  * Vermeld dat de website gelinkte externe websites niet beheert
  * Gebruik `useSeoMeta()` om titel en beschrijving in te stellen
* Stap 4: Maak een herbruikbare `AppFooter.vue`-component in `app/components/` met:
  * Links naar `/privacyverklaring`, `/cookiebeleid` en `/disclaimer`
  * Een knop "Cookievoorkeuren aanpassen" die `localStorage`-sleutel `ollander_consent` verwijdert en de pagina herlaadt zodat de cookiebanner opnieuw verschijnt
  * Copyright-regel met huidig jaar (dynamisch via `new Date().getFullYear()`)
* Stap 5: Voeg `<AppFooter />` toe onderaan `app/app.vue` (boven `<CookieBanner />`)
* Stap 6: Werk `CookieBanner.vue` bij: voeg links naar `/privacyverklaring` en `/cookiebeleid` toe in de bannertekst

### Taak 2
Implementeer volledige SEO-optimalisatie:
* Stap 1: Voeg globale standaard SEO-meta-tags toe in `nuxt.config.ts` via `app.head`:
  * `og:site_name`: `Ollander – Overlevingsgids voor Nederlanders in Vlaanderen`
  * `og:type`: `website`
  * `og:image`: `/og-image.png` (zie Stap 5)
  * `twitter:card`: `summary_large_image`
* Stap 2: Voeg per pagina `useSeoMeta()` toe (indien nog niet aanwezig):
  * `index.vue`: titel `Ollander – Overlevingsgids voor Nederlanders in Vlaanderen`, beschrijving van 150 tekens, `og:url` naar canoniek domein
  * Alle overige pagina's: relevante titels en beschrijvingen
* Stap 3: Installeer en configureer `@nuxtjs/sitemap`:
  * `npm install -D @nuxtjs/sitemap` vanuit `ollander-front/`
  * Voeg de module toe aan `nuxt.config.ts`
  * Stel `siteUrl` in op het productiedomein (placeholder: `https://ollander.be`)
  * Sluit `/api/**` uit van de sitemap
* Stap 4: Maak `public/robots.txt` aan:
  ```
  User-agent: *
  Allow: /
  Disallow: /api/
  Sitemap: https://ollander.be/sitemap.xml
  ```
* Stap 5: Maak een Open Graph-afbeelding `public/og-image.png` (1200×630 px):
  * Gebruik een eenvoudige placeholder-afbeelding (oranje achtergrond, witte tekst "Ollander") totdat een echte afbeelding beschikbaar is
  * Noteer in een commentaar in `nuxt.config.ts` dat deze vervangen dient te worden
* Stap 6: Voeg een canonieke URL-tag toe via `useHead()` in `app/app.vue` of per pagina via `useSeoMeta()`

### Taak 3
Voeg een favicon, web app manifest en gestructureerde data toe:
* Stap 1: Maak favicons aan in `public/`:
  * `favicon.ico` (32×32, oranje achtergrond, witte "O")
  * `favicon-192.png` (192×192 PNG)
  * `favicon-512.png` (512×512 PNG)
  * Noteer in `nuxt.config.ts` dat deze door een grafisch ontwerper vervangen dienen te worden
* Stap 2: Maak `public/manifest.webmanifest` aan:
  ```json
  {
    "name": "Ollander",
    "short_name": "Ollander",
    "description": "Overlevingsgids voor Nederlanders in Vlaanderen",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#f97316",
    "theme_color": "#f97316",
    "icons": [
      { "src": "/favicon-192.png", "sizes": "192x192", "type": "image/png" },
      { "src": "/favicon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
  }
  ```
* Stap 3: Verwijs naar manifest en favicons in `nuxt.config.ts` via `app.head.link`
* Stap 4: Voeg JSON-LD gestructureerde data toe aan `index.vue` via `useHead()`:
  * Type: `WebSite` met `name`, `url` en `description`
  * Type: `BreadcrumbList` is niet van toepassing op de startpagina; sla dit over

### Taak 4
Maak een aangepaste 404-foutpagina en valideer de lighthouse-score:
* Stap 1: Maak `app/error.vue` aan (Nuxt 4 conventie voor foutpagina's):
  * Toon een grappige boodschap in de huisstijl: bv. "404 – Deze pagina is met de fiets naar Nederland gevlucht"
  * Voeg een knop "Terug naar de startpagina" toe die navigeert naar `/`
  * Gebruik dezelfde oranje/gele header-stijl als `index.vue`
  * Toon de foutcode en foutboodschap dynamisch via de `error`-prop
* Stap 2: Voer een lighthouse-audit uit op de productieversie (`npm run build && npm run preview`):
  * Controleer scores voor: Performance, Accessibility, Best Practices, SEO
  * Streefwaarden: alle categorieën ≥ 90
  * Noteer knelpunten en los ze op (bv. ontbrekende `alt`-attributen, onvoldoende contrast)
* Stap 3: Controleer alle afbeeldingen en iconen in `index.vue` op aanwezigheid van `alt`-attributen; voeg ze toe waar ze ontbreken
* Stap 4: Controleer kleurcontrast van tekst t.o.v. achtergrond (WCAG AA: minimaal 4,5:1 voor kleine tekst)
* Stap 5: Voeg `<html lang="nl">` toe aan de Nuxt-configuratie via `app.head.htmlAttrs`

### Taak 5
Schrijf automatische tests in `ollander-qa` voor de productieklaarstelling:
* Stap 1: Maak `tests/productieklaar.spec.ts`
* Stap 2: Test juridische pagina's:
  * Navigeer naar `/privacyverklaring`, `/cookiebeleid` en `/disclaimer`
  * Verifieer HTTP-status 200 en dat de paginatitel het juiste trefwoord bevat
  * Verifieer dat de pagina zichtbare inhoud heeft (minimaal één `<h1>`)
* Stap 3: Test footer op elke pagina (`/`, `/privacyverklaring`, `/cookiebeleid`, `/disclaimer`):
  * Verifieer aanwezigheid van links naar alle drie juridische pagina's
  * Verifieer aanwezigheid van de knop "Cookievoorkeuren aanpassen"
  * Klik op de knop en verifieer dat de cookiebanner opnieuw verschijnt
* Stap 4: Test SEO-meta-tags op de startpagina:
  * Verifieer aanwezigheid van `<meta name="description">` met inhoud
  * Verifieer aanwezigheid van `<meta property="og:title">` met inhoud
  * Verifieer aanwezigheid van `<meta property="og:image">` die wijst naar `/og-image.png`
  * Verifieer aanwezigheid van `<link rel="canonical">` met een URL
* Stap 5: Test robots.txt:
  * Navigeer naar `/robots.txt`
  * Verifieer dat de inhoud `Disallow: /api/` bevat
  * Verifieer dat de inhoud `Sitemap:` bevat
* Stap 6: Test 404-foutpagina:
  * Navigeer naar een niet-bestaand pad (`/bestaat-niet`)
  * Verifieer dat de pagina een tekst bevat die de fout aanduidt (bv. "404")
  * Verifieer dat een link naar de startpagina aanwezig is
* Stap 7: Test `<html lang>` attribuut:
  * Verifieer op de startpagina dat `document.documentElement.lang === "nl"`
* Stap 8: Test manifest en favicon:
  * Verifieer aanwezigheid van `<link rel="manifest">` in de `<head>`
  * Verifieer aanwezigheid van `<link rel="icon">` in de `<head>`
