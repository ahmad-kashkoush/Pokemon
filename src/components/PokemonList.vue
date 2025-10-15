<script setup lang="ts">
import { useRouter } from 'vue-router'
import PokemonCard from './PokemonCard.vue'
import AppLoader from '@/components/app/AppLoader.vue'
import AppError from '@/components/app/AppError.vue'
import { useToast } from 'vue-toastification'
import type { Pokemon } from '@/types/pokemon.type'

interface Props {
  pokemon: Pokemon[]
  isLoading?: boolean
  error?: Error | null
  emptyMessage?: string
  onRetry?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: null,
  emptyMessage: 'No Pokémon found',
  onRetry: undefined
})

const router = useRouter()
const toast = useToast()

const handlePokemonClick = (pokemon: { id: number }) => {
  try {
    router.push(`/${pokemon.id}`)
  } catch (error) {
    toast.error(`Navigation error: ${error}`)
  }
}

const handleRetry = () => {
  if (props.onRetry) {
    props.onRetry()
  }
}
</script>
<template>
  <div class="container">
    <AppLoader :isLoading="isLoading" />
    <AppError :hasError="!!error" :errorMessage="error?.message" @retry="handleRetry" />

    <div v-if="!isLoading && !error && pokemon.length === 0" class="text-center py-8 text-gray-600">
      {{ emptyMessage }}
    </div>

    <div v-if="!isLoading && !error && pokemon.length > 0" class="space-y-3">
      <PokemonCard v-for="poke in pokemon" :key="poke.id" :pokemon="poke" @click="handlePokemonClick" />
    </div>
  </div>
</template>
