<script lang="ts" setup>
import { usePokemonDetailsQuery } from '@/api/pokemon.query'
import { useFavoritesStore } from '@/stores/favorites'
import ImageComponent from '@/components/ImageComponent.vue'
import BackButton from '@/components/BackButton.vue'
import TypeBadge from '@/components/TypeBadge.vue'
import ContentCard from '@/components/ContentCard.vue'
import StatBar from '@/components/StatBar.vue'
import MoveBadge from '@/components/MoveBadge.vue'
import AppLoader from '@/components/app/appLoader.vue'
import AppError from '@/components/app/appError.vue'

const favoritesStore = useFavoritesStore()
const { data: pokemon, isLoading, isError, error, refetch } = usePokemonDetailsQuery()

const handleRetry = () => {
  refetch()
}

// Helper functions
const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}



const getPrimaryTypeColor = (pokemonData: typeof pokemon.value) => {
  if (!pokemonData?.types?.length) return 'bg-gray-400'
  const primaryType = pokemonData.types[0].type.name

  const typeColors: Record<string, string> = {
    water: 'bg-blue-500',
    fire: 'bg-red-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-pink-500',
    ice: 'bg-blue-300',
    dragon: 'bg-purple-600',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-blue-400',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    steel: 'bg-gray-500',
  }
  return typeColors[primaryType] || 'bg-gray-400'
}





const getTotalStats = (stats: Array<{ base_stat: number }>) => {
  return stats.reduce((total, stat) => total + stat.base_stat, 0)
}

const toggleFavorite = () => {
  if (pokemon.value) {
    favoritesStore.toggleFavorite({
      id: pokemon.value.id,
      name: pokemon.value.name,
      sprites: pokemon.value.sprites,
      types: pokemon.value.types
    })
  }
}

</script>
<template>
  <!-- Loading State -->
  <AppLoader :isLoading="isLoading" />

  <!-- Error State -->
  <AppError :hasError="isError" :errorMessage="error?.message || 'Failed to load Pokemon details'"
    @retry="handleRetry" />

  <!-- Pokemon Details -->
  <div v-if="!isLoading && !isError && pokemon" :class="getPrimaryTypeColor(pokemon)" class="min-h-screen">
    <div class="pb-20">
      <!-- Navigation -->
      <div class="flex items-center justify-between p-4 text-white">
        <BackButton />
        <h1 class="text-lg font-semibold">Detail pokemon</h1>
        <button @click="toggleFavorite" class="p-2">
          <svg class="w-6 h-6"
            :class="pokemon && favoritesStore.isFavorite(pokemon.id) ? 'text-red-500 fill-current' : 'text-white'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <!-- Pokemon Info -->
      <div class="px-4 pb-8">
        <h2 class="text-white text-3xl font-bold mb-2">{{ formatName(pokemon.name) }}</h2>

        <!-- Pokemon Image -->
        <div class="flex justify-center">
          <ImageComponent
            :src="pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default"
            :alt="pokemon.name" class="w-48 h-48 object-contain" :lightbox="true" />

        </div>

        <div class="text-center mt-4">
          <p class="text-white text-xl font-bold">#{{ String(pokemon.id).padStart(3, '0') }}</p>
        </div>
      </div>

      <!-- Content Area -->
      <div class="px-4 pt-6">
        <!-- About Card -->
        <ContentCard title="ABOUT">
          <!-- Description -->
          <p class="text-gray-700 text-sm leading-relaxed mb-8">
            Vanaf de dag dat deze Pokémon wordt geboren, zit er een plantenzaadje op zijn rug.
            Het zaad wordt langzaam groter.
          </p>

          <!-- Pokemon Details -->
          <div class="space-y-4 mt-8">
            <!-- Type -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Type</span>
              <div class="flex gap-2">
                <TypeBadge v-for="type in pokemon.types" :key="type.type.name" :type="type.type.name" />
              </div>
            </div>

            <!-- Number -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Nummer</span>
              <span class="font-semibold text-gray-900">{{ String(pokemon.id).padStart(3, '0') }}</span>
            </div>

            <!-- Height -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Hoogte</span>
              <span class="font-semibold text-gray-900">{{ (pokemon.height / 10).toFixed(1) }}m</span>
            </div>

            <!-- Weight -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Gewicht</span>
              <span class="font-semibold text-gray-900">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
            </div>

            <!-- Category -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Categorie</span>
              <span class="font-semibold text-gray-900">Seed</span>
            </div>

            <!-- Gender -->
            <div class="flex items-center gap-8">
              <span class="text-gray-400 text-sm w-20">Geslacht</span>
              <div class="flex gap-1 text-gray-900 font-semibold">
                <span>♂</span>
                <span>♀</span>
              </div>
            </div>

            <!-- Abilities -->
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm w-20">Vaardigheden</span>
              <span class="font-semibold text-gray-900">Overgroeien</span>
            </div>
          </div>
        </ContentCard>

        <!-- Statistics Section -->
        <ContentCard title="STATISTIEKEN" class="mt-6">
          <div class="space-y-4">
            <!-- Individual Stats -->
            <StatBar v-for="stat in pokemon.stats" :key="stat.stat.name" :stat-name="stat.stat.name"
              :stat-value="stat.base_stat" :max-value="150" />

            <!-- Total Stats -->
            <StatBar stat-name="total" :stat-value="getTotalStats(pokemon.stats)" :max-value="600"
              class="border-t pt-4" />
          </div>
        </ContentCard>

        <!-- Moves Section -->
        <ContentCard title="MOVESET" class="mt-6">
          <div class="grid grid-cols-2 gap-3">
            <MoveBadge :level="1" move-name="Tackle" variant="purple" />
            <MoveBadge :level="3" move-name="Vine whip" variant="teal" />
            <MoveBadge :level="1" move-name="Growl" variant="purple" />
            <MoveBadge :level="6" move-name="Growth" variant="yellow" />
          </div>
        </ContentCard>
      </div>
    </div>
  </div>
</template>
