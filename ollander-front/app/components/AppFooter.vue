<template>
  <footer class="bg-gray-800 text-gray-400 text-sm mt-16">
    <div class="bg-gray-800 text-white mt-16">
      <div class="max-w-4xl mx-auto px-4 py-10 text-center">
        <div class="text-4xl mb-3">🧡🇧🇪</div>
        <p class="text-xl font-bold mb-2">ollander.be</p>
        <p class="text-gray-500 text-xs mt-4">
          Geen Hollanders werden gekwetst bij het maken van deze website. Dat denken we toch...
        </p>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <NuxtLink to="/privacyverklaring" class="hover:text-white transition-colors">Privacyverklaring</NuxtLink>
        <NuxtLink to="/cookiebeleid" class="hover:text-white transition-colors">Cookiebeleid</NuxtLink>
        <NuxtLink to="/disclaimer" class="hover:text-white transition-colors">Disclaimer</NuxtLink>
        <button
          class="hover:text-white transition-colors underline underline-offset-2"
          @click="resetCookievoorkeuren"
        >
          Cookievoorkeuren aanpassen
        </button>
      </nav>
      <p class="shrink-0">&copy; {{ huidigJaar }} Ollander</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const huidigJaar = new Date().getFullYear()

function resetCookievoorkeuren() {
  localStorage.removeItem('ollander_consent')
  window.location.reload()
}
</script>
