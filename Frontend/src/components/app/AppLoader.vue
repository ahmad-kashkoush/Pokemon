<script setup lang="ts">
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const props = defineProps({
  isLoading: Boolean
});
</script>

<template>
  <div v-if="props.isLoading" class="text-center text-gray-500 py-6">
    <PulseLoader />
    <slot />
  </div>

</template>
