<script setup lang="ts">
interface Props {
  message?: string
  context?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Select a Pokémon',
  context: 'explorer',
})
</script>

<template>
  <div class="flex items-center justify-center h-full text-gray-500">
    <div class="text-center">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd" />
      </svg>
      <h2 class="text-xl font-semibold mb-2">{{ message }}</h2>
      <p>Choose a Pokémon from {{ context }} to view details</p>
    </div>
  </div>
</template>
