<script setup lang="ts">
import IconAppError from '@/components/icons/IconAppError.vue';
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
        <IconAppError />
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
