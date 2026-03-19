<template>
  <div
    v-if="toonBanner"
    class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4"
  >
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <p class="text-sm text-gray-700 flex-1">
        Wij gebruiken cookies voor gepersonaliseerde advertenties via Google AdSense.
        Door op "Akkoord" te klikken, geef je toestemming conform de AVG/GDPR-regelgeving.
      </p>
      <div class="flex gap-2 shrink-0">
        <button
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          @click="accepteren"
        >
          Akkoord
        </button>
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
          @click="weigeren"
        >
          Weigeren
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { consent, laadToestemming, geefToestemming, weigerToestemming } = useConsent()

const toonBanner = computed(() => consent.value === null)

onMounted(() => {
  laadToestemming()
})

function accepteren() {
  geefToestemming()
  if (window.adsbygoogle) {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }
}

function weigeren() {
  weigerToestemming()
}
</script>
