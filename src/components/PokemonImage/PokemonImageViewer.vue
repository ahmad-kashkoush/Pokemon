<script setup lang="ts">
import { computed, ref } from 'vue'
import ImageLightbox from '@/components/PokemonImage/ImageLightbox.vue'
import ImageNavigation from '@/components/PokemonImage/ImageNavigation.vue'
import { useImageExtraction } from '@/composables/useImageExtraction'

interface Props {
  sprites: object
  pokemonName?: string
  class?: string
  alt?: string
  showThumbnails?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  zoomIncrement?: number
}

const props = withDefaults(defineProps<Props>(), {
  sprites: () => ({}),
  pokemonName: 'Pokemon',
  class: '',
  alt: '',
  showThumbnails: true,
  enableZoom: true,
  enablePan: true,
  zoomIncrement: 0.25
})

// Use the image extraction composable
const { extractedImages } = useImageExtraction(props.sprites, props.pokemonName)

// Local reactive data
const isLightboxOpen = ref(false)
const selectedImageIndex = ref(0)

// Computed properties
const hasImages = computed(() => extractedImages.value.length > 0)
const hasMultipleImages = computed(() => extractedImages.value.length > 1)

const displayImage = computed(() => {
  if (!hasImages.value || extractedImages.value.length === 0) {
    return {
      src: '/placeholder-pokemon.png',
      alt: `${props.pokemonName} placeholder`,
      category: 'Placeholder'
    }
  }
  return extractedImages.value[selectedImageIndex.value] || extractedImages.value[0] || {
    src: '/placeholder-pokemon.png',
    alt: `${props.pokemonName} image`,
    category: 'Default'
  }
})

// Navigation methods
const goToPrevious = () => {
  if (hasMultipleImages.value) {
    selectedImageIndex.value = selectedImageIndex.value === 0
      ? extractedImages.value.length - 1
      : selectedImageIndex.value - 1
  }
}

const goToNext = () => {
  if (selectedImageIndex.value < extractedImages.value.length - 1) {
    selectedImageIndex.value++
  }
}

// Event handlers
const handleImageClick = () => {
  if (hasImages.value) {
    isLightboxOpen.value = true
  }
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

// Lightbox navigation
const lightboxGoToPrevious = () => {
  goToPrevious()
}

const lightboxGoToNext = () => {
  goToNext()
}
</script>

<template>
  <div class="relative">
    <div class="relative mb-4 flex justify-center">
      <div class="relative group">
        <!-- Current Image -->
        <img v-if="displayImage.src" :src="displayImage.src" :alt="displayImage.alt" @click="handleImageClick"
          :class="[props.class || 'w-auto h-auto max-w-xs max-h-72 object-contain', 'cursor-pointer select-none rounded-lg transition-transform hover:scale-[1.02]']" />

        <!-- Fallback when no images available -->
        <div v-else
          :class="[props.class || 'w-auto max-w-xs h-48', 'bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg']">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </div>

        <!-- Navigation Arrows and Counter -->
        <ImageNavigation :current-index="selectedImageIndex" :total-images="extractedImages.length"
          @previous="goToPrevious" @next="goToNext" />

        <!-- Click to zoom indicator -->
        <div v-if="hasImages"
          class="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Click to zoom
        </div>
      </div>
    </div>



    <!-- Image Lightbox with Navigation -->
    <ImageLightbox v-if="isLightboxOpen" :src="displayImage.src" :alt="displayImage.alt" :enable-zoom="enableZoom"
      :enable-pan="enablePan" :zoom-increment="zoomIncrement" @close="closeLightbox">
      <!-- Add navigation arrows to lightbox if multiple images -->
      <template v-if="hasMultipleImages" #extra-controls>
        <div class="flex gap-2">
          <button @click="lightboxGoToPrevious"
            class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            aria-label="Previous image">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button @click="lightboxGoToNext"
            class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white" aria-label="Next image">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image counter in lightbox -->
          <div class="flex items-center px-3 py-2 bg-white/20 rounded-full text-white text-sm">
            {{ selectedImageIndex + 1 }} / {{ extractedImages.length }}
          </div>
        </div>
      </template>
    </ImageLightbox>
  </div>
</template>
