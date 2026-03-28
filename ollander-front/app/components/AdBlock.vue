<template>
  <div v-if="consent === true" ref="container">
    <ins
      ref="insEl"
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-7526091117069803"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    adsbygoogle: { push: (config: object) => void }[]
  }
}

const props = defineProps<{
  adSlot: string
  adFormat?: string
}>()

const adFormat = computed(() => props.adFormat ?? 'auto')

const { consent } = useConsent()

const container = ref<HTMLElement | null>(null)
const insEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (consent.value === true) {
    activeer()
  }
})

watch(consent, (nieuw) => {
  if (nieuw === true) {
    nextTick(() => activeer())
  }
})

function activeer() {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    // adsbygoogle niet beschikbaar
  }

  // Verberg container als het blok leeg blijft
  setTimeout(() => {
    if (insEl.value?.classList.contains('adsbygoogle-noads') && container.value) {
      container.value.style.display = 'none'
    }
  }, 2000)
}
</script>
