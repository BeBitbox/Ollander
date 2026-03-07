<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- Hero sectie -->
    <header class="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <div class="text-6xl mb-4">🧡🍺🧇</div>
        <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow">
          Welkom in Vlaanderen, ollander!
        </h1>
        <p class="text-xl md:text-2xl font-medium mb-6 opacity-90">
          Ge zijt hier nu, ge kunt er niet meer onderuit.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <span class="bg-white/20 rounded-full px-4 py-2">🇳🇱 → 🇧🇪</span>
          <span class="bg-white/20 rounded-full px-4 py-2">Overlevingsgids</span>
          <span class="bg-white/20 rounded-full px-4 py-2">100% gratis</span>
          <span class="bg-white/20 rounded-full px-4 py-2">Gebaseerd op pijnlijke ervaringen</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-12 space-y-16">

      <!-- Taalwoordenboek -->
      <section>
        <h2 class="text-3xl font-black text-gray-800 mb-2">📖 Het Grote Ollandse Woordenboek</h2>
        <p class="text-gray-500 mb-6">
          Hetzelfde woord, totaal andere betekenis. Leer dit uit het hoofd, het redt levens.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="woord in woordenboek" :key="woord.nl" class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-2xl">{{ woord.emoji }}</span>
              <div class="flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-sm">🇳🇱 {{ woord.nl }}</span>
                  <span class="text-gray-400">→</span>
                  <span class="bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded text-sm">🇧🇪 {{ woord.vl }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-600 text-sm">{{ woord.uitleg }}</p>
          </div>
        </div>
      </section>

      <!-- Do's en Don'ts -->
      <section>
        <h2 class="text-3xl font-black text-gray-800 mb-2">✅❌ Do's & Don'ts</h2>
        <p class="text-gray-500 mb-6">Wat ge moet doen, en wat ge echt niet moet zeggen.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 class="font-bold text-green-700 text-xl mb-4 flex items-center gap-2">
              <span>✅</span> Do's
            </h3>
            <ul class="space-y-3">
              <li v-for="item in dos" :key="item" class="flex items-start gap-2 text-green-800">
                <span class="mt-0.5 text-green-500 font-bold text-lg leading-5">+</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-6 border border-red-100">
            <h3 class="font-bold text-red-700 text-xl mb-4 flex items-center gap-2">
              <span>❌</span> Don'ts
            </h3>
            <ul class="space-y-3">
              <li v-for="item in donts" :key="item" class="flex items-start gap-2 text-red-800">
                <span class="mt-0.5 text-red-500 font-bold text-lg leading-5">−</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Eten & Drinken -->
      <section>
        <h2 class="text-3xl font-black text-gray-800 mb-2">🍟 Eten & Drinken Survival Gids</h2>
        <p class="text-gray-500 mb-6">
          De Belg leeft om te eten. Gij zult ermee moeten leren leven.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="item in etenDrinken" :key="item.naam" class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="text-4xl mb-3">{{ item.emoji }}</div>
            <h3 class="font-bold text-gray-800 text-lg mb-1">{{ item.naam }}</h3>
            <p class="text-gray-600 text-sm">{{ item.uitleg }}</p>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-16">
      <div class="max-w-4xl mx-auto px-4 py-10 text-center">
        <div class="text-4xl mb-3">🧡🇧🇪</div>
        <p class="text-xl font-bold mb-2">ollander.be</p>
        <p class="text-gray-400 text-sm max-w-md mx-auto">
          Gemaakt met liefde voor alle Nederlanders die de moed hadden om de grens over te steken.
          Proficiat. Ge zijt hier nu. En het is hier eigenlijk best tof.
        </p>
        <p class="text-gray-500 text-xs mt-4">
          Geen Hollanders werden gekwetst bij het maken van deze website. Dat denken we toch...
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ollander.be — Welkom in Vlaanderen, ollander!',
  description: 'De complete overlevingsgids voor Nederlanders die naar Vlaanderen komen wonen en werken.',
})

const woordenboek = [
  {
    emoji: '🍟',
    nl: 'patat',
    vl: 'frieten',
    uitleg: 'Patat is een scheldwoord hier. Ge bestelt "een pakje frieten" of ge wordt uitgelachen.',
  },
  {
    emoji: '📱',
    nl: 'mobiel',
    vl: 'GSM',
    uitleg: 'Niemand hier weet wat ge bedoelt met "ik bel je op mijn mobieltje". Zeg GSM, punt.',
  },
  {
    emoji: '🏠',
    nl: 'kamer',
    vl: 'kot',
    uitleg: 'Een kot is een studentenkamer. Buiten die context is het een smerige, kleine ruimte. Context matters.',
  },
  {
    emoji: '🎒',
    nl: 'bakje',
    vl: 'kopje',
    uitleg: 'Vlamingen drinken s`ochtends een kopje koffie. Een bakje/bakkie/tas koffie bestaat niet in het zuiden.',
  },
  {
    emoji: '👴',
    nl: 'oom',
    vl: 'nonkel',
    uitleg: 'Uw vader\'s broer is hier uw nonkel. "Oom" klinkt te formeel of te Hollands.',
  },
  {
    emoji: '🤷',
    nl: 'nou',
    vl: 'allee',
    uitleg: '"Allée" is het Vlaamse stopwoordje voor alles: ongeduld, instemming, verbazing, of gewoon niets.',
  },
  {
    emoji: '🇫🇷',
    nl: '...',
    vl: 'voilà / merci / ça va',
    uitleg: 'Belgen mengen Frans en Nederlands tot een Vlaamse cocktail. "Voilà" zeggen ze als afsluiting van iets. "ça va" is het antwoord op "hoe ist?"'
  },
]

const dos = [
  'Zeg "een pintje" als ge een biertje wilt bestellen.',
  'Wees bescheiden op het Vlaams grondgebied. Knokke, Sint-Martens-Latem en Brasschaat zijn de uitzonderingen.',
  'Lachen met Heineken. Het is kattepis. Daar zijn we in alle Vlaamse provincies het met eens.',
  'Brood verpak je in een papieren broodzak, niet in plastiek 🤮.',
  'Gebruik Paycontact of bancontact voor betalingen. Itsme voor in te loggen op websites',
]

const donts = [
  'Begin niet over de taalgrens tenzij ge zeker weet wat ge doet. Dat is een mijnenveld.',
  'Vraag niet naar "koffie verkeerd". Dat bestaat niet. Vraag een latté of een cappuccino.',
  'Lach niet met de politiek. De Nederlands politiek is tegenwoordig niet meer beter 😉',
  'Onderschat de Belgische bureaucratie niet. Plan drie keer zoveel tijd als normaal.',
  'Wees niet te direct.',
  'Gierigheid is een zonde. Vlamingen zijn als Bourgondiërs, elke maaltijd kan de laatste zijn. Hoe vettiger, hoe prettiger.'
]

const etenDrinken = [
  {
    emoji: '🍟',
    naam: 'Frieten',
    uitleg: 'Dubbel gebakken. Met mayonaise, stoofvleessaus, of andalouse. De frituur is de Belgische tempel',
  },
  {
    emoji: '🍺',
    naam: 'Pintje',
    uitleg: 'Een Jupiler, Stella Artois of Maes. Koud geschonken met een behoorlijk schuimkraag. Verkeerd inschenken is een belediging.',
  },
  {
    emoji: '🧇',
    naam: 'Wafels',
    uitleg: 'Luikse wafel (klein en zoet) of Brusselse wafel (groot en luchtig). Beide zijn correct. Beide zijn verplicht.',
  },
  {
    emoji: '🍫',
    naam: 'Chocolade',
    uitleg: 'Côte d\'Or, Neuhaus, Godiva. Reep uit de automaat is hier een nationale tragedie. Koop echte Belgische pralines.',
  },
  {
    emoji: '🥩',
    naam: 'Stoofvlees',
    uitleg: 'Vlees gestoofd in bier, met brood en mosterd. Dit is zielenvreugde. Ge zult het begrijpen na de eerste hap.',
  },
  {
    emoji: '🥐',
    naam: 'Koffiekoeken',
    uitleg: 'Koffiekoeken zijn heiliger dan de misviering op zondag: chocolade koek, croissant, suisse, crèmekoek, boterkoek, achtje,...',
  },
  {
    emoji: '🫙',
    naam: 'Jenever',
    uitleg: 'Belgische gin. Wordt gedronken in een te vol glaasje. Eerste slok doe je staan, hoofd gebogen. Traditie.',
  },
  {
    emoji: '🍲',
    naam: 'Gegratineerde witloof',
    uitleg: 'Witloof, hebt ge dat wel in Nederland? Hier in ham gewikkeld, met kaas overgoten en in de oven. Belgisch comfort food.',
  },
  {
    emoji: '🦪',
    naam: 'Mosselen',
    uitleg: 'De Belgische oester! Eten wanneer ge kunt. We aanvaarden die van de Zeeuws Vlamingen ook',
  },
]
</script>
