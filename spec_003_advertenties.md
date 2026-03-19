# Spec 003: advertenties

## Doel
De website moet contextueel relevante advertenties tonen via het Google AdSense-platform (onderdeel van Alphabet).
De advertenties worden automatisch afgestemd op de inhoud van de pagina waarop ze verschijnen, zodat bezoekers enkel advertenties te zien krijgen die aansluiten bij het thema van de website: Nederlanders die migreren of werken in Vlaanderen/België.
Het doel is om de website te monetariseren zonder afbreuk te doen aan de gebruikerservaring.
De advertenties worden geladen via het Google AdSense-script en zijn volledig beheerd door Google op basis van de inhoud en het gedrag van de bezoeker, conform de GDPR-regelgeving die van toepassing is voor Belgische en Nederlandse bezoekers.

## Notities
* Een geldig Google AdSense-account is vereist: de publisher-ID (`ca-pub-7526091117069803`)
* GDPR-compliance is verplicht: gebruikers in de EER moeten toestemming geven vóór het laden van gepersonaliseerde advertenties; gebruik hiervoor het Google Consent Management Platform (CMP) of een vergelijkbaar gecertificeerd systeem
* Laad het AdSense-script niet synchroon in `<head>` zodat pagina-performance niet lijdt; gebruik `async`
* Advertentieblokken mogen de leesbaarheid en navigatie niet blokkeren; vermijd plaatsing boven de vouwlijn op mobiel
* Zorg voor een nette fallback wanneer een advertentieblok leeg wordt teruggegeven (bv. verberg het element)
* Houd rekening met de Content Security Policy (CSP): AdSense vereist specifieke toegestane domeinen
* Test in een staging-omgeving met testmodus van AdSense om onjuiste impressies te vermijden
* In het AdSense-dashboard zijn twee advertentie-eenheden:
  * Eén "display"-blok voor gebruik in de zijbalk of tussen secties (responsief formaat): data-ad-slot="5993821684"
  * Eén "in-article"-blok voor gebruik tussenin langere tekst: data-ad-slot="8874168294"

## Taken

### Taak 1
Integreer het AdSense-script en de cookietoestemming in de Nuxt 4 frontend (`ollander-front`):
* Stap 1: Voeg het AdSense-laadscript toe als externe script in `nuxt.config.ts` via de `app.head.script`-array:
  * `src`: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7526091117069803`
  * `async: true`
  * `crossorigin: "anonymous"`
* Stap 2: Implementeer een cookiebanner-component `CookieBanner.vue` in `app/components/`:
  * Toon de banner wanneer nog geen toestemming is opgeslagen in `localStorage`
  * Bied twee knoppen aan: "Akkoord" en "Weigeren"
  * Bij "Akkoord": sla `{ consent: true }` op in `localStorage` onder de sleutel `ollander_consent` en laad AdSense
  * Bij "Weigeren": sla `{ consent: false }` op; laad AdSense niet en verberg advertentieblokken
* Stap 3: Voeg `CookieBanner.vue` toe aan `app/app.vue` zodat de banner globaal beschikbaar is
* Stap 4: Exporteer een composable `useConsent.ts` in `app/composables/` die de toestemmingsstatus ophaalt uit `localStorage` en reactief beschikbaar stelt
* Stap 5: Voeg de vereiste AdSense-domeinen toe aan de Content Security Policy in `nuxt.config.ts` (`routeRules` of Nitro headers):
  * `script-src`: `https://pagead2.googlesyndication.com`
  * `frame-src`: `https://googleads.g.doubleclick.net`
  * `img-src`: `https://*.google.com https://*.googlesyndication.com`

### Taak 2
Implementeer herbruikbare advertentiecomponenten in de frontend (`ollander-front`):
* Stap 1: Maak een component `AdBlock.vue` in `app/components/`:
  * Props: `adSlot` (String, verplicht), `adFormat` (String, standaard `"auto"`)
  * Intern: render een `<ins class="adsbygoogle">` element met de juiste `data-*` attributen
  * Roep via `onMounted` de `(adsbygoogle = window.adsbygoogle || []).push({})` aan om het blok te activeren
  * Controleer via `useConsent` of toestemming is gegeven; render het element enkel wanneer `consent === true`
  * Fallback: wanneer het `<ins>`-element na laden leeg blijft (klasse `adsbygoogle-noads`), verberg de container met `display: none`
* Stap 2: Maak een component `AdSidebar.vue` in `app/components/` die `AdBlock.vue` wikkelt voor de display-eenheid (zie Taak 1, stap 4)
* Stap 3: Maak een component `AdInArticle.vue` in `app/components/` die `AdBlock.vue` wikkelt voor de in-article-eenheid

### Taak 3
Integreer de advertentiecomponenten op de bestaande pagina's (`ollander-front`):
* Stap 1: Open `app/pages/index.vue` (startpagina)
  * Voeg `<AdInArticle />` in tussen de tweede en derde inhoudssectie
  * Voeg `<AdSidebar />` in de zijkolom of onderaan de pagina op mobiel (gebruik Tailwind-klassen voor responsieve plaatsing)
* Stap 2: Open `app/pages/quiz.vue` (quizpagina, indien aanwezig)
  * Voeg `<AdInArticle />` in na het introsegment, vóór het quizformulier
  * Voeg `<AdSidebar />` in naast of na het scorebord
* Stap 3: Controleer op mobiele weergave dat geen advertentie boven de vouwlijn verschijnt die de hoofdnavigatie of -inhoud blokkeert
* Stap 4: Verifieer dat bij `consent === false` geen `<ins>`-elementen worden gerenderd en dat de layout niet breekt door lege ruimte

### Taak 4
Schrijf automatische tests in `ollander-qa` voor de advertentie-integratie:
* Stap 1: Maak een testbestand `tests/advertenties.spec.ts`
* Stap 2: Test cookiebanner-weergave:
  * Navigeer naar de startpagina zonder opgeslagen toestemming
  * Verifieer dat de cookiebanner zichtbaar is
  * Verifieer dat er geen `<ins class="adsbygoogle">`-elementen zichtbaar zijn zolang toestemming ontbreekt
* Stap 3: Test toestemming weigeren:
  * Klik op "Weigeren"
  * Verifieer dat de banner verdwijnt
  * Verifieer dat `localStorage.getItem("ollander_consent")` de waarde `{"consent":false}` bevat
  * Verifieer dat er geen advertentieblokken zichtbaar zijn
* Stap 4: Test toestemming geven:
  * Herlaad pagina en klik op "Akkoord"
  * Verifieer dat de banner verdwijnt
  * Verifieer dat `localStorage.getItem("ollander_consent")` de waarde `{"consent":true}` bevat
  * Verifieer dat `<ins class="adsbygoogle">`-elementen aanwezig zijn in de DOM
* Stap 5: Test persistentie van toestemming:
  * Sla toestemming op via `localStorage` vóór navigatie
  * Navigeer naar de startpagina
  * Verifieer dat de cookiebanner niet verschijnt
* Stap 6: Test layout op mobiele formaten (iPhone SE, Pixel 5, Galaxy S9+):
  * Verifieer dat geen advertentieblok de hoofdnavigatie of -inhoud boven de vouwlijn overlapt
  * Verifieer dat de pagina geen horizontale overflow heeft
