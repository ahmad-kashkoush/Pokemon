<script setup lang="ts">
interface Props {
  title: string
  onClick?: () => void
}

defineProps<Props>()
</script>

<template>
  <div class="p-4 border-t">
    <div @click="onClick" class="cursor-pointer bg-blue-600 p-4 rounded-xl text-white">
      <h3 class="font-semibold">← Back to {{ title }}</h3>
    </div>
  </div>
</template>
