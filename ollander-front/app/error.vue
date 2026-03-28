<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white">
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <div class="text-7xl mb-4">🚲💨</div>
        <h1 class="text-5xl md:text-7xl font-black mb-4 tracking-tight drop-shadow">
          {{ error.status }}
        </h1>
        <p class="text-2xl md:text-3xl font-bold mb-3">
          <template v-if="error.status === 404">
            Deze pagina is met de caravan naar Nederland teruggekeerd
          </template>
          <template v-else>
            Er is iets grondig misgegaan, ollander
          </template>
        </p>
        <p class="text-orange-100 text-lg mt-2">
          {{ error.message }}
        </p>
      </div>
    </header>

    <main class="max-w-xl mx-auto px-4 py-16 text-center">
      <p class="text-gray-600 text-lg mb-8">
        <template v-if="error.status === 404">
          De pagina die je zoekt bestaat niet (meer), is verhuisd, of heeft besloten eens goed te profiteren van de Belgische sociale zekerheid.
        </template>
        <template v-else>
          Onze servers hebben even een pintje nodig. Probeer het later opnieuw.
        </template>
      </p>
      <button
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-md"
        @click="handleError"
      >
        ← Terug naar de startpagina
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
