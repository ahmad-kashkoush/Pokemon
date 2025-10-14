<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  hasError?: boolean;
  errorMessage?: string;
  showRetry?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasError: false,
  errorMessage: 'Something went wrong. Please try again.',
  showRetry: true
});

const emit = defineEmits<{
  retry: []
}>();

const displayMessage = computed(() => {
  return props.errorMessage || 'Something went wrong. Please try again.';
});

const handleRetry = () => {
  emit('retry');
};
</script>

<template>
  <div v-if="props.hasError" class="text-center py-8 px-4">
    <div class="max-w-md mx-auto">
      <!-- Error Icon -->
      <div class="mb-4">
        <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>

      <!-- Error Message -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Oops!</h3>
      <p class="text-gray-600 mb-6">{{ displayMessage }}</p>

      <!-- Retry Button -->
      <button v-if="props.showRetry" @click="handleRetry"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        Try Again
      </button>

      <!-- Custom Slot for additional actions -->
      <div class="mt-4">
        <slot />
      </div>
    </div>
  </div>
</template>
