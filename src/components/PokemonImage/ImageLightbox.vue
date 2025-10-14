<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt?: string
  enableZoom?: boolean
  enablePan?: boolean
  zoomIncrement?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  enableZoom: true,
  enablePan: true,
  zoomIncrement: 0.25
})

const emit = defineEmits<{
  close: []
}>()

const imageRef = ref<HTMLImageElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

// Zoom and pan state
const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const panStartX = ref(0)
const panStartY = ref(0)

// Apply zoom/pan styles
const imageStyle = computed(() => {
  return {
    transform: `translate(${panX.value}px, ${panY.value}px) scale(${zoom.value})`,
    transformOrigin: 'center center',
    transition: isPanning.value ? 'none' : 'transform 0.1s ease-out',
    cursor: props.enablePan ? (isPanning.value ? 'grabbing' : 'grab') : 'default',
    willChange: 'transform'
  }
})

// Zoom handling
const handleWheel = (event: WheelEvent) => {
  if (!props.enableZoom || !imageRef.value) return

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

// Enhanced pan handling with improved drag boundaries
const handleMouseDown = (event: MouseEvent) => {
  if (!props.enablePan || !containerRef.value) return

  event.preventDefault()
  isPanning.value = true
  panStartX.value = event.clientX - panX.value
  panStartY.value = event.clientY - panY.value

  // Add document listeners when starting to pan
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isPanning.value) return

  event.preventDefault()

  // Calculate new pan position based on mouse movement
  const newPanX = event.clientX - panStartX.value
  const newPanY = event.clientY - panStartY.value

  // Apply more liberal constraints to allow free movement
  const maxRange = 400 // Allow 400px movement in any direction

  // Apply constraints for smoother dragging
  panX.value = Math.max(-maxRange, Math.min(newPanX, maxRange))
  panY.value = Math.max(-maxRange, Math.min(newPanY, maxRange))
}

const handleMouseUp = () => {
  isPanning.value = false
  // Remove document listeners when stopping pan
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleTouchStart = (event: TouchEvent) => {
  if (!props.enablePan) return

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
  if (!isPanning.value || event.touches.length !== 1) return

  event.preventDefault()
  const touch = event.touches[0]
  if (!touch) return

  // Calculate new pan position based on touch movement
  const newPanX = touch.clientX - panStartX.value
  const newPanY = touch.clientY - panStartY.value

  // Apply more liberal constraints to allow free movement
  const maxRange = 400 // Allow 400px movement in any direction

  // Apply constraints for smoother dragging
  panX.value = Math.max(-maxRange, Math.min(newPanX, maxRange))
  panY.value = Math.max(-maxRange, Math.min(newPanY, maxRange))
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

// Handle keyboard navigation and controls
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      if (props.enablePan) {
        event.preventDefault()
        panX.value = Math.max(panX.value - 30, -getMaxPanX())
      }
      break
    case 'ArrowRight':
      if (props.enablePan) {
        event.preventDefault()
        panX.value = Math.min(panX.value + 30, getMaxPanX())
      }
      break
    case 'ArrowUp':
      if (props.enablePan) {
        event.preventDefault()
        panY.value = Math.max(panY.value - 30, -getMaxPanY())
      }
      break
    case 'ArrowDown':
      if (props.enablePan) {
        event.preventDefault()
        panY.value = Math.min(panY.value + 30, getMaxPanY())
      }
      break
  }
}

// Helper functions to get maximum pan values
const getMaxPanX = () => {
  return 400 // Allow 400px movement in any direction
}

const getMaxPanY = () => {
  return 400 // Allow 400px movement in any direction
}

const closeLightbox = () => {
  emit('close')
  resetZoomAndPan()
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
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
    <!-- Close button -->
    <button @click="closeLightbox" class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10">
      ×
    </button>

    <!-- Controls -->
    <div class="absolute top-4 left-4 flex gap-4 items-center text-sm z-10">
      <!-- Zoom controls -->
      <div v-if="enableZoom" class="flex gap-2 items-center">
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
        <button v-if="zoom > 1 || panX !== 0 || panY !== 0" @click="resetZoomAndPan"
          class="px-3 py-1 bg-blue-500 bg-opacity-70 hover:bg-opacity-90 text-white rounded transition-colors">
          Reset
        </button>
      </div>

      <!-- Drag controls -->
      <div v-if="enablePan" class="flex gap-1 items-center">
        <div class="grid grid-cols-3 gap-1">
          <div></div>
          <button @click="() => panY = Math.max(panY - 30, -getMaxPanY())"
            class="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors flex items-center justify-center"
            title="Move Up">
            ↑
          </button>
          <div></div>
          <button @click="() => panX = Math.max(panX - 30, -getMaxPanX())"
            class="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors flex items-center justify-center"
            title="Move Left">
            ←
          </button>
          <button @click="resetZoomAndPan"
            class="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors flex items-center justify-center text-xs"
            title="Center">
            ⌂
          </button>
          <button @click="() => panX = Math.min(panX + 30, getMaxPanX())"
            class="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors flex items-center justify-center"
            title="Move Right">
            →
          </button>
          <div></div>
          <button @click="() => panY = Math.min(panY + 30, getMaxPanY())"
            class="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors flex items-center justify-center"
            title="Move Down">
            ↓
          </button>
          <div></div>
        </div>
      </div>
    </div>

    <!-- Position indicator -->
    <div v-if="enablePan && (panX !== 0 || panY !== 0)"
      class="absolute bottom-16 right-4 text-white text-xs bg-black bg-opacity-50 rounded px-2 py-1 z-10">
      Position: {{ Math.round(panX) }}, {{ Math.round(panY) }}
    </div>

    <!-- Help text -->
    <div v-if="enablePan"
      class="absolute bottom-4 left-4 right-4 text-center text-white text-sm bg-black bg-opacity-30 rounded px-3 py-2 z-10">
      <p>Drag to move • Use arrow keys • Scroll to zoom • ESC to close</p>
    </div>

    <!-- Zoomable/pannable image container -->
    <div ref="containerRef" class="w-full h-full flex items-center justify-center overflow-hidden"
      @mousedown="handleMouseDown" @touchstart="handleTouchStart" @wheel="handleWheel">
      <img ref="imageRef" :src="src" :alt="alt" :style="imageStyle" class="w-80 h-auto select-none" />
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
