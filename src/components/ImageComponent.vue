<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  class?: string
  alt?: string
  lightbox?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  zoomIncrement?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  alt: '',
  lightbox: false,
  enableZoom: true,
  enablePan: true,
  zoomIncrement: 0.25
})

const lightboxToggler = ref(false)
const imageRef = ref<HTMLImageElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

// Zoom and pan state
const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const panStartX = ref(0)
const panStartY = ref(0)

const imageClass = computed(() => {
  const baseClass = props.class
  const cursorClass = props.lightbox ? 'cursor-pointer' : ''
  return `${baseClass} ${cursorClass}`.trim()
})

// Only apply zoom/pan styles when lightbox is open
const imageStyle = computed(() => {
  if (!lightboxToggler.value) {
    return {} // No transform when lightbox is closed
  }

  return {
    transform: `scale(${zoom.value}) translate(${panX.value}px, ${panY.value}px)`,
    transformOrigin: 'center center',
    transition: isPanning.value ? 'none' : 'transform 0.2s ease-out',
    cursor: props.enablePan && zoom.value > 1 ? (isPanning.value ? 'grabbing' : 'grab') : 'default'
  }
})

// Optional event handlers
const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const onLoad = (event: Event) => {
  emit('load', event)
}

const onError = (event: Event) => {
  emit('error', event)
}

const openLightbox = () => {
  if (props.lightbox) {
    lightboxToggler.value = !lightboxToggler.value
  }
}

// Zoom handling - only when lightbox is open
const handleWheel = (event: WheelEvent) => {
  if (!props.enableZoom || !imageRef.value || !lightboxToggler.value) return

  event.preventDefault()

  const delta = event.deltaY > 0 ? -props.zoomIncrement : props.zoomIncrement
  const newZoom = Math.max(1, Math.min(zoom.value + delta, 4))

  zoom.value = newZoom

  // Reset pan if zoomed out to default
  if (newZoom === 1) {
    panX.value = 0
    panY.value = 0
  }
}

// Pan handling - only when lightbox is open
const handleMouseDown = (event: MouseEvent) => {
  if (!props.enablePan || zoom.value <= 1 || !containerRef.value || !lightboxToggler.value) return

  event.preventDefault()
  isPanning.value = true
  panStartX.value = event.clientX - panX.value
  panStartY.value = event.clientY - panY.value

  // Add document listeners when starting to pan
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isPanning.value || !lightboxToggler.value) return

  event.preventDefault()
  const img = imageRef.value
  if (!img) return

  panX.value = event.clientX - panStartX.value
  panY.value = event.clientY - panStartY.value

  // Constrain panning within reasonable bounds
  const maxPan = (img.offsetWidth * (zoom.value - 1)) / 2
  panX.value = Math.max(-maxPan, Math.min(panX.value, maxPan))
  panY.value = Math.max(-maxPan, Math.min(panY.value, maxPan))
}

const handleMouseUp = () => {
  isPanning.value = false
  // Remove document listeners when stopping pan
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleTouchStart = (event: TouchEvent) => {
  if (!props.enablePan || zoom.value <= 1 || !lightboxToggler.value) return

  if (event.touches.length === 1) {
    event.preventDefault()
    isPanning.value = true
    const touch = event.touches[0]
    if (touch) {
      panStartX.value = touch.clientX - panX.value
      panStartY.value = touch.clientY - panY.value
    }

    // Add document listeners for touch events
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }
}

const handleTouchMove = (event: TouchEvent) => {
  if (!isPanning.value || event.touches.length !== 1 || !lightboxToggler.value) return

  event.preventDefault()
  const touch = event.touches[0]
  if (!touch) return

  panX.value = touch.clientX - panStartX.value
  panY.value = touch.clientY - panStartY.value

  const img = imageRef.value
  if (!img) return

  const maxPan = (img.offsetWidth * (zoom.value - 1)) / 2
  panX.value = Math.max(-maxPan, Math.min(panX.value, maxPan))
  panY.value = Math.max(-maxPan, Math.min(panY.value, maxPan))
}

const handleTouchEnd = () => {
  isPanning.value = false
  // Remove document listeners
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
}

const resetZoomAndPan = () => {
  zoom.value = 1
  panX.value = 0
  panY.value = 0
}

// Handle escape key to close lightbox
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && lightboxToggler.value) {
    closeLightbox()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  // Clean up any remaining event listeners
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})

// Reset zoom and pan when lightbox closes
const closeLightbox = () => {
  lightboxToggler.value = false
  resetZoomAndPan()
}
</script>

<template>
  <div class="relative">
    <!-- Main image - no pan/zoom, just click to open lightbox -->
    <img :src="src" :alt="alt" :class="imageClass" @load="onLoad" @error="onError" @click="openLightbox"
      class="w-full h-auto select-none" />

    <!-- Lightbox with pan/zoom functionality -->
    <div v-if="lightboxToggler" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <!-- Close button -->
      <button @click="closeLightbox" class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10">
        ×
      </button>

      <!-- Zoom controls -->
      <div v-if="enableZoom" class="absolute top-4 left-4 flex gap-2 items-center text-sm z-10">
        <button @click="() => zoom = Math.max(1, zoom - zoomIncrement)"
          class="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
          :disabled="zoom <= 1">
          −
        </button>
        <span class="w-16 text-center text-white">{{ (zoom * 100).toFixed(0) }}%</span>
        <button @click="() => zoom = Math.min(4, zoom + zoomIncrement)"
          class="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
          :disabled="zoom >= 4">
          +
        </button>
        <button v-if="zoom > 1" @click="resetZoomAndPan"
          class="px-3 py-1 bg-blue-500 bg-opacity-70 hover:bg-opacity-90 text-white rounded transition-colors">
          Reset
        </button>
      </div>

      <!-- Zoomable/pannable image container -->
      <div ref="containerRef" class="w-full h-full flex items-center justify-center overflow-hidden"
        @mousedown="handleMouseDown" @touchstart="handleTouchStart" @wheel="handleWheel">
        <img ref="imageRef" :src="src" :alt="alt" :style="imageStyle" class="max-w-full max-h-full select-none" />
      </div>
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
