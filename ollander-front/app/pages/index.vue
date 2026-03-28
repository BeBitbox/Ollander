<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- Hero sectie -->
    <header class="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
      <div class="max-w-4xl mx-auto px-4 py-12 text-center">
        <div class="text-6xl mb-4">🧡🍺🧇</div>
        <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow">
          Welkom in Vlaanderen, ollander!
        </h1>
        <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <span class="rounded-full px-4 py-2">🇳🇱 → 🇧🇪</span>
          <span class="rounded-full px-4 py-2">Overlevingsgids</span>
          <span class="rounded-full px-4 py-2">100% gratis</span>
          <span class="rounded-full px-4 py-2">Gebaseerd op pijnlijke ervaringen</span>
        </div>
      </div>
    </header>

    <!-- Navigatie -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-2 flex flex-wrap justify-center gap-1 overflow-x-auto scrollbar-hide">
        <a href="#woordenboek" class="bg-orange-50 shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-blue-100 hover:text-orange-600 transition-colors">📖 Woordenboek</a>
        <a href="#dos-donts" class="bg-orange-50 shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-blue-100 hover:text-orange-600 transition-colors">✅ Do's & Don'ts</a>
        <a href="#eten" class="bg-orange-50 shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-blue-100 hover:text-orange-600 transition-colors">🍟 Eten & Drinken</a>
        <a href="#quiz" class="bg-orange-50 shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-blue-100 hover:text-orange-600 transition-colors">🧪 Quiz</a>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-4 py-12 space-y-16">

      <!-- Taalwoordenboek -->
      <section id="woordenboek">
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
      <section id="dos-donts">
        <h2 class="text-3xl font-black text-gray-800 mb-2">✅ Do's & ❌ Don'ts</h2>
        <p class="text-gray-500 mb-6">Wat ge moet doen, en waar ge ZEKERS van moet afblijven.</p>
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

      <!-- Advertentie tussen secties -->
      <AdInArticle/>

      <!-- Eten & Drinken -->
      <section id="eten">
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

      <!-- Quiz sectie -->
      <section id="quiz">

        <!-- Quiz kaart -->
        <div class="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-8 mb-6">

          <h2 class="text-3xl font-black mb-2">🧪 Ben jij al een echte Vlaming?</h2>
          <p class="opacity-90 mb-6">
            Doe de Ollander Integratiequiz en ontdek hoe Vlaams ge eigenlijk al zijt!
          </p>

          <!-- Laden -->
          <div v-if="fase === 'laden'" class="text-center py-10">
            <div class="text-5xl mb-3">⏳</div>
            <p class="opacity-75">Even laden...</p>
          </div>

          <!-- Intro / formulier -->
          <div v-else-if="fase === 'intro'">
            <div class="bg-white/10 rounded-xl p-4 mb-6 text-sm">
              <p class="font-bold mb-2">📋 Hoe werkt de quiz?</p>
              <ul class="space-y-1 opacity-90 list-disc list-inside">
                <li>10 ludieke vragen over Vlaamse cultuur en gewoonten</li>
                <li>Na elk antwoord opent de volgende vraag direct</li>
                <li>⏱️ <strong>Snelheid telt!</strong> Hoe sneller, hoe hoger uw eindranking</li>
                <li>Ge kunt de quiz maar éénmaal doen</li>
              </ul>
            </div>

            <div v-if="laadFout" class="bg-red-500/20 border border-red-400 rounded-lg p-3 mb-4 text-sm">
              ⚠️ {{ laadFout }}
            </div>

            <form @submit.prevent="startQuiz" class="flex flex-col sm:flex-row gap-3">
              <input
                  v-model="formulierNaam"
                  type="text"
                  placeholder="Uw naam (bv. Kees Pannekoek)"
                  class="flex-1 rounded-lg px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
                  :disabled="quizGedaan || bezig"
                  required
              />
              <button
                  type="submit"
                  :disabled="quizGedaan || bezig"
                  class="px-6 py-3 rounded-lg font-bold text-lg transition-all whitespace-nowrap"
                  :class="quizGedaan
                  ? 'bg-gray-500 cursor-not-allowed opacity-60'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 active:scale-95'"
              >
                {{ bezig ? '⏳ Bezig...' : quizGedaan ? '✅ Quiz al gedaan' : '🚀 Start de quiz!' }}
              </button>
            </form>

            <p v-if="quizGedaan" class="mt-3 text-sm opacity-75 text-center">
              Ge hebt de quiz al gedaan. Bekijk de top 10 hieronder!
            </p>
          </div>

          <!-- Quiz vragen -->
          <div v-else-if="fase === 'quiz'">
            <!-- Voortgangsbalk -->
            <div class="mb-6">
              <div class="flex justify-between text-sm opacity-75 mb-1">
                <span>Vraag {{ huidigVraagIndex + 1 }} van {{ vragen.length }}</span>
                <span>Score: {{ quizScore }}/{{ gegevenAntwoorden.length }}</span>
              </div>
              <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                    class="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    :style="{ width: `${(huidigVraagIndex / vragen.length) * 100}%` }"
                />
              </div>
            </div>

            <!-- Vraag -->
            <div class="bg-white/10 rounded-xl p-6">
              <h3 class="text-xl font-bold mb-5">{{ huidigVraag.vraag }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                    v-for="(optie, i) in huidigVraag.opties"
                    :key="i"
                    :disabled="bezig"
                    @click="beantwoordVraag(i)"
                    class="text-left px-4 py-3 rounded-lg font-medium transition-all bg-white/20 hover:bg-white/35 border border-white/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <span class="font-black mr-2 opacity-70">{{ ['A', 'B', 'C', 'D'][i] }}.</span>{{ optie }}
                </button>
              </div>
            </div>

            <div v-if="bezig" class="text-center mt-4 opacity-75">
              <span class="text-xl">⏳</span> Resultaat verwerken...
            </div>
          </div>

          <!-- Resultaten -->
          <div v-else-if="fase === 'resultaat'">
            <!-- Titel en score -->
            <div class="text-center mb-8">
              <div class="text-6xl mb-3">
                {{ quizScore === 10 ? '🏆' : quizScore >= 7 ? '🇧🇪' : quizScore >= 4 ? '🍺' : '🚐' }}
              </div>
              <h3 class="text-3xl font-black mb-2">{{ statusTitel(quizScore) }}</h3>
              <p class="text-5xl font-black opacity-90">
                {{ quizScore }}<span class="text-2xl opacity-60">/10</span>
              </p>
            </div>

            <!-- Statistieken (enkel als stopResultaat beschikbaar) -->
            <div v-if="stopResultaat" class="grid grid-cols-3 gap-3 mb-8">
              <div class="bg-white/10 rounded-xl p-4 text-center">
                <div class="text-2xl font-black">{{ stopResultaat.score }}/10</div>
                <div class="text-xs opacity-65 mt-1">Score</div>
              </div>
              <div class="bg-white/10 rounded-xl p-4 text-center">
                <div class="text-2xl font-black">{{ formatTijd(stopResultaat.tijd) }}</div>
                <div class="text-xs opacity-65 mt-1">Tijd</div>
              </div>
              <div class="bg-white/10 rounded-xl p-4 text-center">
                <div class="text-2xl font-black">#{{ stopResultaat.plaats }}</div>
                <div class="text-xs opacity-65 mt-1">Plaatsing</div>
              </div>
            </div>

            <!-- Overzicht alle vragen en antwoorden -->
            <div class="space-y-3">
              <h4 class="font-bold text-lg">📋 Jouw antwoorden:</h4>
              <div
                  v-for="(vraag, i) in vragen"
                  :key="i"
                  class="bg-white/10 rounded-xl p-4"
              >
                <p class="font-semibold mb-3 text-sm">
                  <span class="opacity-60">{{ i + 1 }}.</span> {{ vraag.vraag }}
                </p>
                <div class="space-y-1.5">
                  <div
                      v-for="(optie, j) in vraag.opties"
                      :key="j"
                      class="text-sm px-3 py-1.5 rounded-lg flex items-center gap-2"
                      :class="{
                      'bg-green-500/40 font-semibold': j === vraag.juist,
                      'bg-red-500/40': j === gegevenAntwoorden[i] && j !== vraag.juist,
                      'opacity-40': j !== vraag.juist && j !== gegevenAntwoorden[i],
                    }"
                  >
                    <span class="shrink-0 w-4">
                      <template v-if="j === gegevenAntwoorden[i] && j === vraag.juist">✅</template>
                      <template v-else-if="j === gegevenAntwoorden[i]">❌</template>
                      <template v-else-if="j === vraag.juist">💡</template>
                    </span>
                    {{ optie }}
                    <span v-if="j === vraag.juist && j !== gegevenAntwoorden[i]" class="opacity-70 text-xs">(juist antwoord)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Top 10 tabel -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-2xl font-black text-gray-800 mb-1">🏆 De Vlaamse Erelijst</h3>
          <p class="text-gray-500 text-sm mb-5">Top 10 meest geïntegreerde Ollanders — gesorteerd op rank</p>

          <div v-if="topTien.length === 0" class="text-center py-10 text-gray-400">
            <div class="text-4xl mb-2">🦗</div>
            <p>Nog geen deelnemers. Wees de eerste!</p>
          </div>

          <table v-else class="w-full text-sm">
            <thead>
            <tr class="text-left text-gray-400 border-b border-gray-100 text-xs uppercase tracking-wide">
              <th class="pb-2 font-semibold w-8">#</th>
              <th class="pb-2 font-semibold">Naam</th>
              <th class="pb-2 font-semibold text-right">Score</th>
              <th class="pb-2 font-semibold text-right">Tijd</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="entry in topTien"
                :key="entry.plaats"
                class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td class="py-2.5 font-bold text-gray-400 text-xs">{{ entry.plaats }}</td>
              <td class="py-2.5 font-semibold text-gray-800">
                {{ entry.plaats === 1 ? '🥇' : entry.plaats === 2 ? '🥈' : entry.plaats === 3 ? '🥉' : '' }}
                {{ entry.naam }}
              </td>
              <td class="py-2.5 text-right font-bold text-green-600">{{ entry.score }}/10</td>
              <td class="py-2.5 text-right text-gray-500">{{ formatTijd(entry.tijd) }}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </section>

      <!-- Zijbalkenadvertentie (onderaan op mobiel, verborgen boven de vouwlijn) -->
      <div class="mt-4">
        <AdSidebar/>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import AdSidebar from "~/components/AdSidebar.vue";
import AdInArticle from "~/components/AdInArticle.vue";

useSeoMeta({
  title: 'Ollander – Overlevingsgids voor Nederlanders in Vlaanderen',
  description: 'Alles wat een Nederlander moet weten om te overleven in Vlaanderen: woordenboek, do\'s & don\'ts, eten, drinken en een quiz.',
  ogTitle: 'Ollander – Overlevingsgids voor Nederlanders in Vlaanderen',
  ogDescription: 'Alles wat een Nederlander moet weten om te overleven in Vlaanderen: woordenboek, do\'s & don\'ts, eten, drinken en een quiz.',
  ogUrl: 'https://ollander.be/',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://ollander.be/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ollander.be',
        url: 'https://ollander.be/',
        description: 'Overlevingsgids voor Nederlanders die in Vlaanderen wonen of werken.',
      }),
    },
  ],
})

// --- API configuratie ---
const config = useRuntimeConfig()
const apiBase = config.public.apiBase as string

// --- Quiz state ---
type Fase = 'laden' | 'intro' | 'quiz' | 'resultaat'
const fase = ref<Fase>('laden')
const formulierNaam = ref('')
const quizGedaan = ref(false)
const challenge = ref('')
const laadFout = ref('')
const bezig = ref(false)
const huidigVraagIndex = ref(0)
const quizScore = ref(0)
const gegevenAntwoorden = ref<number[]>([])

interface StopResultaat {
  naam: string
  score: number
  tijd: number
  plaats: number
}

interface TopEntry {
  naam: string
  score: number
  tijd: number
  plaats: number
}

const stopResultaat = ref<StopResultaat | null>(null)
const topTien = ref<TopEntry[]>([])

// --- Quiz vragen ---
const vragen = [
  {
    vraag: '🍺 Ge staat aan de toog en wilt een biertje. Wat zegt een echte Vlaming?',
    opties: ['Een biertje graag!', 'Een pintje graag!', 'Een vaasje, meneer!', 'Mag ik een koud blondje?'],
    juist: 1,
  },
  {
    vraag: '🍸 Genoeg over alcohol: bestel een niet-alcoholische aperitief',
    opties: [
      'Glaasje karnemelk, aub',
      'Voor mij een fruitsapje',
      'Doe mij maar een jus d`orange',
      'Voor mij een Heineken',
    ],
    juist: 1,
  },
  {
    vraag: '🗣️ Wat is vijfde regel in de Brabançonne?',
    opties: ['Wees ons doel in arbeid en in strijd.', 'Wat is de Brabançonne?', 'Wie kent die tekst nu van buiten?', 'Een Prinse van Oranje'],
    juist: 2,
  },
  {
    vraag: '👑 Wie is onze kroonprinses?',
    opties: [
      'Elisabeth',
      'Leonor',
      'Catharina-Amalia',
      'De rosse van K3',
    ],
    juist: 0,
  },
  {
    vraag: '🏡 Uw Belgische buurvrouw zegt: Wat een schoon huis heb gij! Wat bedoelt ze?',
    opties: ['Jouw huis is te groot', 'Jouw huis is goed gepoetst', 'Jouw huis is een caravan', 'Jouw huis is mooi'],
    juist: 3,
  },
  {
    vraag: 'Ge staat in een Delhaize en wilt betalen. Wat zegt ge?',
    opties: ['Ik wil graag chippen', 'Accepteren jullie Tikkies?', 'Mag ik pinnen?', 'Kan ik met de kaart betalen?'],
    juist: 3,
  },
  {
    vraag: '🥃 Het is gelukt! Ge moogt naar een Vlaams informeel feestje. Hoe begroet ge uw oudere gastvrouw?',
    opties: [
      'Drie kussen',
      'Twee kussen',
      'Een handdruk',
      'Met de tanden bloot grommen als teken van dominantie',
    ],
    juist: 0,
  },
  {
    vraag: '🥪 Wat bevat een broodje Martino?',
    opties: ['Warme vleeskroket', 'Ham, kaas en veel groentjes', 'Préparé, ui, augurk met speciale saus', 'Boulet met Bicky saus'],
    juist: 2,
  },
  {
    vraag: 'Belgïe is legendarisch om zijn staatsstructuur. Hoeveel regeringen heeft dit klein landje?',
    opties: ['1', '3', '6', '10'],
    juist: 2,
  },
  {
    vraag: '👫 Een Vlaming vraagt jou: "Gaan we poepen?"',
    opties: ['Ge biedt die persoon een Imodium aan tegen darmklachten', 'Der wacht een avontuur tussen de lakens', 'Ge wijst naar de toiletten.', 'Ge gaat in foetushouding liggen tot de agressieve Vlaming weg is.'],
    juist: 1,
  },
]

const huidigVraag = computed(() => vragen[huidigVraagIndex.value])

// --- Hulpfuncties ---
function statusTitel(score: number): string {
  if (score === 10) return '🏆 Oervlaams'
  if (score >= 8) return '🇧🇪 Volwaardige Vlaming'
  if (score >= 6) return '🍺 Bijna geïntegreerd'
  if (score >= 4) return '🍟 Vaste frituurbezoeker'
  if (score >= 2) return '🚗 Dagjesreiziger'
  return '🚐 Ollandse toerist met caravan'
}

function formatTijd(ms: number): string {
  const sec = Math.floor(ms / 1000)
  const min = Math.floor(sec / 60)
  const rest = sec % 60
  if (min > 0) return `${min}m ${rest}s`
  return `${sec}s`
}

// --- API calls ---
async function laadTopTien() {
  try {
    topTien.value = await $fetch<TopEntry[]>(`${apiBase}/api/top`)
  } catch {
    // Stil falen — top 10 is niet kritisch
  }
}

onMounted(async () => {
  try {
    const init = await $fetch<{ naam: string; quizGedaan: boolean; challenge: string }>(
        `${apiBase}/api/init`
    )
    formulierNaam.value = init.naam
    quizGedaan.value = init.quizGedaan
    challenge.value = init.challenge + 'Turbo'
  } catch {
    laadFout.value = 'Kon de server niet bereiken. Probeer de pagina te herladen.'
  }

  await laadTopTien()
  fase.value = 'intro'
})

async function startQuiz() {
  laadFout.value = ''
  bezig.value = true
  try {
    const res = await $fetch<{ success: boolean }>(`${apiBase}/api/start`, {
      method: 'POST',
      body: {challenge: challenge.value, naam: formulierNaam.value},
    })
    if (res.success) {
      huidigVraagIndex.value = 0
      quizScore.value = 0
      gegevenAntwoorden.value = []
      fase.value = 'quiz'
    } else {
      laadFout.value = 'Kon de quiz niet starten. Heb je de quiz misschien al gedaan?'
    }
  } catch {
    laadFout.value = 'Verbindingsfout bij starten van de quiz. Probeer opnieuw.'
  }
  bezig.value = false
}

async function beantwoordVraag(optieIndex: number) {
  if (bezig.value) return

  gegevenAntwoorden.value.push(optieIndex)
  if (optieIndex === vragen[huidigVraagIndex.value].juist) {
    quizScore.value++
  }

  if (huidigVraagIndex.value < vragen.length - 1) {
    huidigVraagIndex.value++
  } else {
    await stopQuiz()
  }
}

async function stopQuiz() {
  bezig.value = true
  try {
    const res = await $fetch<{ success: boolean } & StopResultaat>(`${apiBase}/api/stop`, {
      method: 'POST',
      body: {challenge: challenge.value, score: quizScore.value},
    })
    if (res.success) {
      stopResultaat.value = {naam: res.naam, score: res.score, tijd: res.tijd, plaats: res.plaats}
      quizGedaan.value = true
    }
    await laadTopTien()
  } catch {
    laadFout.value = 'Fout bij opslaan van het resultaat.'
  }
  fase.value = 'resultaat'
  bezig.value = false
}

// --- Bestaande data ---
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
    uitleg: 'Vlamingen drinken s`ochtends een kopje koffie. Een bakje/bakkie/tas koffie bestaat niet in het Zuiden.',
  },
  {
    emoji: '👴',
    nl: 'oom',
    vl: 'nonkel',
    uitleg: 'Uw vader\'s broer is hier uw nonkel. "Oom" klinkt te formeel of te Hollands.',
  },
  {
    emoji: '🤷 🇫🇷',
    nl: 'nou',
    vl: 'allé / voilà / ça va',
    uitleg: 'Belgen mengen Frans en Nederlands tot een Vlaamse cocktail. Onze favoriete stopwoordjes zijn Frans.'
  },
]

const dos = [
  'Zeg "een pintje" als ge een biertje op vat wilt bestellen.',
  'Wees bescheiden op het Vlaams grondgebied. Knokke, Sint-Martens-Latem en Brasschaat zijn de uitzonderingen.',
  'Lach met Heineken! Het is kattepis. Daar is elke Belg het over eens.',
  'Verpak brood altijd in een papieren broodzak, niet in plastiek 🤮.',
  'Gebruik Paycontact of Bancontact voor betalingen. Voor in te loggen: Itsme',
]

const donts = [
  'Begin niet over de taalgrens tenzij ge zeker weet wat ge doet. Dat is een mijnenveld.',
  'Vraag niet naar "koffie verkeerd". Dat bestaat niet. Vraag een latté of een cappuccino.',
  'Lach niet met onze politiek. De Nederlandse politiek is tegenwoordig niet meer beter 😉',
  'Onderschat de Belgische bureaucratie niet. Plan drie keer zoveel tijd als normaal.',
  'Gierigheid is een zonde. Vecht om als eerste een rondje te trakteren.'
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
    uitleg: 'Koffiekoeken zijn heiliger dan de misviering op zondag: chocolade koek, croissant, suisse, crèmekoek, boterkoek, achtje,... Heb ge ze allemaal geprobeerd?',
  },
  {
    emoji: '🫙',
    naam: 'Jenever',
    uitleg: 'Belgische gin. Wordt gedronken in een te vol glaasje. Eerste slok doe ge staand, hoofd gebogen. Traditie.',
  },
  {
    emoji: '🍲',
    naam: 'Gegratineerde witloof',
    uitleg: 'Witloof, hebt ge dat wel in Nederland? Hier in ham gewikkeld, met kaas overgoten en in de oven. Belgisch comfort food.',
  },
  {
    emoji: '🦪',
    naam: 'Mosselen',
    uitleg: 'De Belgische oester! Eten wanneer ge kunt. We delen die liefde met onze Zeeuwse buren',
  },
]
</script>
