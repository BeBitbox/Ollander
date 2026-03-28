<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
      <div class="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 class="text-3xl md:text-5xl font-black mb-2 tracking-tight drop-shadow">
          Privacyverklaring
        </h1>
        <p class="text-orange-100 text-sm">Laatst bijgewerkt: maart 2026</p>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 py-12 space-y-10 text-gray-700 leading-relaxed">

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">1. Wie zijn wij?</h2>
        <p>
          Deze website wordt beheerd door <strong>BitBox</strong>, bereikbaar via
          <a href="mailto:ollander.dpo@bitbox.be" class="text-orange-600 underline">ollander.dpo@bitbox.be</a>.
          Wij zijn de verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verwerkt.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">2. Welke gegevens verwerken wij?</h2>
        <p>
          Wij verwerken uitsluitend gegevens die noodzakelijk zijn voor het functioneren van de website: zoals de naam die u invult wanneer je een quiz start. Dit dient enkel en alleen om het scorebord te voeden.
        </p>
        <p class="mt-3">
          De volgende technische gegevens worden verwerkt:
        </p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>IP-adres: voor te garanderen dat de quiz maar éénmaal per gebruiker wordt ingevuld</li>
          <li>Je cookietoestemmingskeuze, opgeslagen in <code class="bg-gray-100 px-1 rounded">localStorage</code> onder de sleutel <code class="bg-gray-100 px-1 rounded">ollander_consent</code></li>
          <li>Technische gegevens via Google AdSense (IP-adres, browsergegevens, surfgedrag) wanneer je daarvoor toestemming geeft</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">3. Waarvoor gebruiken wij jouw gegevens?</h2>

        <h3 class="font-semibold text-gray-800 mt-4 mb-1">3.1 Cookietoestemming</h3>
        <p>
          Wij slaan jouw keuze omtrent cookies op in de lokale opslag van jouw browser. Dit gebeurt uitsluitend om te onthouden of je toestemming hebt gegeven of geweigerd, zodat de cookiebanner niet bij elk bezoek opnieuw verschijnt.
        </p>
        <p class="mt-1"><strong>Rechtsgrondslag:</strong> toestemming (art. 6, lid 1, sub a AVG).</p>

        <h3 class="font-semibold text-gray-800 mt-4 mb-1">3.2 Gepersonaliseerde advertenties via Google AdSense</h3>
        <p>
          Wanneer je toestemming geeft, tonen wij advertenties via Google AdSense, een dienst van Google Ireland Ltd. (Gordon House, Barrow Street, Dublin 4, Ierland). Google verwerkt hierbij persoonsgegevens als verwerkingsverantwoordelijke voor haar eigen doeleinden (gepersonaliseerde advertenties).
        </p>
        <p class="mt-1">
          Meer informatie over hoe Google jouw gegevens verwerkt, vind je in het
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="text-orange-600 underline">privacybeleid van Google</a>.
        </p>
        <p class="mt-1"><strong>Rechtsgrondslag:</strong> toestemming (art. 6, lid 1, sub a AVG).</p>
        <h3 class="font-semibold text-gray-800 mt-4 mb-1">3.3 Quiz</h3>
        <p>
          Wanneer je de quiz start, slaan we de opgegeven naam met uw IP op in een databank. Dit dient enkel en alleen om het scorebord te bewaren.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">4. Hoe lang bewaren wij jouw gegevens?</h2>
        <p>
          De cookietoestemmingskeuze wordt opgeslagen in de lokale opslag van jouw browser en blijft bewaard totdat je de browseropslag wist of jouw keuze aanpast via de knop "Cookievoorkeuren aanpassen" in de footer. Wij als website-eigenaar bewaren geen kopie van deze keuze op onze servers.
        </p>
        <p>
          De naam en IP-adres worden maximaal één jaar in de databank bewaard, waarna die prompt wordt verwijderd.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">5. Jouw rechten</h2>
        <p>Op grond van de AVG heb je de volgende rechten:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li><strong>Recht op inzage</strong> – je kunt opvragen welke gegevens wij van jou verwerken</li>
          <li><strong>Recht op rectificatie</strong> – je kunt onjuiste gegevens laten corrigeren</li>
          <li><strong>Recht op verwijdering</strong> – je kunt verzoeken jouw gegevens te verwijderen</li>
          <li><strong>Recht op intrekking van toestemming</strong> – je kunt jouw toestemming te allen tijde intrekken via de knop "Cookievoorkeuren aanpassen" in de footer</li>
          <li><strong>Recht op klacht</strong> – je kunt een klacht indienen bij de Gegevensbeschermingsautoriteit (België)</li>
        </ul>
        <p class="mt-3">
          Voor verzoeken kun je contact opnemen via
          <a href="mailto:ollander.dpo@bitbox.be" class="text-orange-600 underline">ollander.dpo@bitbox.be</a>.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-900 mb-3">6. Wijzigingen</h2>
        <p>
          Wij behouden het recht deze privacyverklaring te wijzigen. De meest actuele versie is altijd beschikbaar via <NuxtLink to="/privacyverklaring" class="text-orange-600 underline">ollander.be/privacyverklaring</NuxtLink>.
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
  title: 'Privacyverklaring – Ollander',
  description: 'Lees hoe Ollander omgaat met jouw persoonsgegevens, cookies en advertenties conform de AVG/GDPR.',
  ogTitle: 'Privacyverklaring – Ollander',
  ogDescription: 'Lees hoe Ollander omgaat met jouw persoonsgegevens, cookies en advertenties conform de AVG/GDPR.',
})
</script>
