<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
      <div class="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 class="text-3xl md:text-5xl font-black mb-2 tracking-tight drop-shadow">
          Disclaimer
        </h1>
        <p class="text-orange-100 text-sm">Laatst bijgewerkt: maart 2026</p>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 py-12 space-y-10 text-gray-700 leading-relaxed">

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">1. Algemeen</h2>
        <p>
          Ollander is een informatieve website bedoeld voor Nederlanders die in Vlaanderen of België wonen, werken of plannen te verhuizen. De inhoud van deze website is met zorg samengesteld, maar heeft uitsluitend een humoristisch satirisch karakter.
        </p>
        <p class="mt-3">
          Aan de informatie op deze website kunnen geen rechten worden ontleend. Wij aanvaarden geen aansprakelijkheid voor schade die voortvloeit uit het gebruik van of vertrouwen op de inhoud van deze website.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">2. Geen juridisch, financieel of medisch advies</h2>
        <p>
          De informatie op Ollander is niet bedoeld als vervanging voor professioneel juridisch, fiscaal, financieel of medisch advies. Raadpleeg voor jouw specifieke situatie altijd een erkende professional zoals een advocaat, notaris, accountant of arts.
        </p>
        <p class="mt-3">
          Wet- en regelgeving wijzigt regelmatig. Wij streven ernaar de informatie actueel te houden, maar kunnen niet garanderen dat alle inhoud volledig up-to-date is op het moment van raadplegen.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">3. Externe links</h2>
        <p>
          Deze website bevat links naar externe websites van derden. Ollander heeft geen invloed op de inhoud, het beleid of de betrouwbaarheid van deze externe websites en aanvaardt hiervoor geen aansprakelijkheid. Het opnemen van een externe link houdt geen aanbeveling in van de betreffende website of de organisatie achter die website.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">4. Beschikbaarheid</h2>
        <p>
          Wij streven naar een ononderbroken beschikbaarheid van de website, maar kunnen dit niet garanderen. Wij behouden het recht de website op elk moment aan te passen, tijdelijk offline te halen of geheel te beëindigen zonder voorafgaande kennisgeving.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">5. Intellectueel eigendom</h2>
        <p>
          Alle inhoud op deze website — waaronder teksten, afbeeldingen en het ontwerp — is eigendom van de beheerder van Ollander of wordt gebruikt met toestemming van de rechthebbenden. Niets van deze website mag worden overgenomen, verveelvoudigd of openbaar gemaakt zonder voorafgaande schriftelijke toestemming.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">6. Toepasselijk recht</h2>
        <p>
          Op deze disclaimer is het Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde Belgische rechter.
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
  title: 'Disclaimer – Ollander',
  description: 'Lees de disclaimer van Ollander over aansprakelijkheid, externe links en het gebruik van de informatie op deze website.',
  ogTitle: 'Disclaimer – Ollander',
  ogDescription: 'Lees de disclaimer van Ollander over aansprakelijkheid, externe links en het gebruik van de informatie op deze website.',
})
</script>
