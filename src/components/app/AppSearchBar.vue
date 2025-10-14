<template>
  <div class="relative py-4">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input v-model="searchValue" type="text" placeholder="Pokemon zoeken"
      class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      @input="onSearchInput" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')

const emit = defineEmits<{
  search: [value: string]
}>()

const onSearchInput = () => {
  emit('search', searchValue.value)
}

// Also emit on mount for initial state
defineExpose({
  searchValue
})
</script>

<style scoped>
/* Tailwind classes handle all styling */
</style>
