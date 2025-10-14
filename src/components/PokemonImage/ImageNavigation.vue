<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentIndex: number
  totalImages: number
  showCounter?: boolean
}

interface Emits {
  (e: 'previous'): void
  (e: 'next'): void
}

const props = withDefaults(defineProps<Props>(), {
  showCounter: true,
})

const emit = defineEmits<Emits>()

// Computed properties
const hasMultipleImages = computed(() => props.totalImages > 1)

// Navigation methods
const goToPrevious = () => {
  emit('previous')
}

const goToNext = () => {
  emit('next')
}
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <template v-if="hasMultipleImages">
      <!-- Previous Arrow -->
      <button @click.stop="goToPrevious"
        class="absolute left-[-4rem] top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-auto"
        aria-label="Previous image">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Next Arrow -->
      <button @click.stop="goToNext"
        class="absolute right-[-4rem] top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-auto"
        aria-label="Next image">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </template>

    <!-- Image counter -->
    <div v-if="showCounter && hasMultipleImages"
      class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
      {{ currentIndex + 1 }} / {{ totalImages }}
    </div>
  </div>
</template>
