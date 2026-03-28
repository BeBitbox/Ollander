<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
      <div class="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 class="text-3xl md:text-5xl font-black mb-2 tracking-tight drop-shadow">
          Cookiebeleid
        </h1>
        <p class="text-orange-100 text-sm">Laatst bijgewerkt: maart 2026</p>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 py-12 space-y-10 text-gray-700 leading-relaxed">

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">1. Wat zijn cookies?</h2>
        <p>
          Cookies zijn kleine tekstbestanden die worden opgeslagen op jouw apparaat wanneer je een website bezoekt. Ze helpen websites om jouw voorkeuren te onthouden en om de werking van de site te verbeteren. Naast cookies maakt deze website ook gebruik van <code class="bg-gray-100 px-1 rounded">localStorage</code>, een vergelijkbare technologie die gegevens lokaal in jouw browser opslaat.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">2. Welke cookies gebruikt Ollander?</h2>

        <div class="overflow-x-auto mt-4">
          <table class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead class="bg-orange-50 text-gray-800">
              <tr>
                <th class="text-left px-4 py-3 font-semibold">Naam</th>
                <th class="text-left px-4 py-3 font-semibold">Type</th>
                <th class="text-left px-4 py-3 font-semibold">Doel</th>
                <th class="text-left px-4 py-3 font-semibold">Bewaartermijn</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="bg-white">
                <td class="px-4 py-3"><code class="bg-gray-100 px-1 rounded">ollander_consent</code></td>
                <td class="px-4 py-3">localStorage</td>
                <td class="px-4 py-3">Onthoudt jouw cookie-toestemmingskeuze (akkoord of geweigerd)</td>
                <td class="px-4 py-3">Tot jij de opslag wist of jouw keuze aanpast</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="px-4 py-3">Google AdSense cookies</td>
                <td class="px-4 py-3">Derde partij</td>
                <td class="px-4 py-3">Gepersonaliseerde advertenties tonen op basis van surfgedrag</td>
                <td class="px-4 py-3">Zie Google-beleid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-4">
          De Google AdSense-cookies worden uitsluitend geplaatst nadat je daarvoor toestemming hebt gegeven. Een volledig overzicht van de cookies die Google gebruikt, vind je op de
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" class="text-orange-600 underline">pagina over advertentiecookies van Google</a>.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">3. Toestemming geven of intrekken</h2>
        <p>
          Bij jouw eerste bezoek verschijnt een cookie-banner onderaan de pagina. Hierin kun je kiezen om te akkoord gaan met of te weigeren voor het plaatsen van advertentiecookies.
        </p>
        <p class="mt-3">
          Jouw keuze kun je op elk moment aanpassen via de knop <strong>"Cookievoorkeuren aanpassen"</strong> in de footer van elke pagina. Na het klikken verschijnt de cookie-banner opnieuw zodat je een nieuwe keuze kunt maken.
        </p>
        <p class="mt-3">
          Je kunt cookies ook verwijderen via de instellingen van jouw browser. Houd er rekening mee dat dit invloed kan hebben op de werking van andere websites.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">4. Meer informatie</h2>
        <p>
          Voor meer informatie over hoe wij omgaan met jouw persoonsgegevens verwijzen wij naar onze
          <NuxtLink to="/privacyverklaring" class="text-orange-600 underline">privacyverklaring</NuxtLink>.
        </p>
      </section>

      <div class="pt-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline">
          ← Terug naar de startpagina
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

useSeoMeta({
  title: 'Cookiebeleid – Ollander',
  description: 'Bekijk welke cookies en localStorage-sleutels Ollander gebruikt en hoe je jouw cookievoorkeuren kunt aanpassen.',
  ogTitle: 'Cookiebeleid – Ollander',
  ogDescription: 'Bekijk welke cookies en localStorage-sleutels Ollander gebruikt en hoe je jouw cookievoorkeuren kunt aanpassen.',
  ogUrl: 'https://ollander.be/cookiebeleid',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://ollander.be/cookiebeleid' }],
})
</script>
