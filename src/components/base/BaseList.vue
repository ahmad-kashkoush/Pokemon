<script setup lang="ts">
import type { Pokemon } from '@/types/pokemon.type'
import AppBackButton from '@/components/app/AppBackButton.vue'
import PokemonList from '@/components/PokemonList.vue'

interface Props {
  title: string
  pokemon: Pokemon[]
  emptyMessage: string
  heroClass?: string
  metaInfo?: string
  onBackClick?: () => void
}

withDefaults(defineProps<Props>(), {
  heroClass: '',
})
</script>

<template>
  <main :class="heroClass || 'page-layout'">
    <!-- Header -->
    <div class="hero-header">
      <AppBackButton :onClick="onBackClick" />
      <div>
        <h1 class="text-3xl font-bold text-white">
          {{ title }}
        </h1>
        <p v-if="metaInfo" class="text-white/80 mt-1">
          {{ metaInfo }}
        </p>
      </div>
    </div>

    <PokemonList :pokemon="pokemon" :emptyMessage="emptyMessage" />
  </main>
</template>
