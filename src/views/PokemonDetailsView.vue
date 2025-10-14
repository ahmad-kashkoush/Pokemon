<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { usePokemonDetailsQuery } from '@/api/pokemon.query'
import { useFavoritesStore } from '@/stores/favorites'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const { data: pokemon, isLoading, isError } = usePokemonDetailsQuery()

// Helper functions
const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const formatTypeName = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const getTypeColor = (type: string) => {
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
  return typeColors[type] || 'bg-gray-400'
}

const getPrimaryTypeColor = (pokemonData: typeof pokemon.value) => {
  if (!pokemonData?.types?.length) return 'bg-gray-400'
  const primaryType = pokemonData.types[0].type.name
  return getTypeColor(primaryType)
}

const goBack = () => {
  router.go(-1)
}

const formatStatName = (statName: string) => {
  const statMap: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  }
  return statMap[statName] || statName
}

const getStatBarColor = (statValue: number) => {
  if (statValue >= 60) return 'bg-green-500'
  if (statValue >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
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
  <div v-if="pokemon" :class="getPrimaryTypeColor(pokemon)" class="min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <p class="text-white mb-4">Error loading Pokemon details</p>
        <button @click="goBack" class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg">Go Back</button>
      </div>
    </div>

    <!-- Pokemon Details -->
    <div v-else-if="pokemon" class="pb-20">
      <!-- Navigation -->
      <div class="flex items-center justify-between p-4 text-white">
        <button @click="goBack" class="p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
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
          <img v-if="pokemon.sprites?.other?.['official-artwork']?.front_default"
            :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name"
            class="w-48 h-48 object-contain" />
          <img v-else-if="pokemon.sprites?.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name"
            class="w-48 h-48 object-contain" />
        </div>

        <div class="text-center mt-4">
          <p class="text-white text-xl font-bold">#{{ String(pokemon.id).padStart(3, '0') }}</p>
        </div>
      </div>

      <!-- Content Area -->
      <div class="px-4 pt-6">
        <!-- About Card -->
        <div>
          <h3 class="font-bold text-lg py-2 text-white">ABOUT</h3>
          <div class="bg-white rounded-2xl p-6 shadow-lg">
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
                  <span v-for="type in pokemon.types" :key="type.type.name" :class="getTypeColor(type.type.name)"
                    class="px-3 py-1 rounded-full text-xs font-medium text-white">
                    {{ formatTypeName(type.type.name) }}
                  </span>
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
          </div>
        </div>

        <!-- Statistics Section -->
        <div class="mt-6">
          <h3 class="font-bold text-lg py-2 text-white">STATISTIEKEN</h3>
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="space-y-4">
              <!-- Individual Stats -->
              <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="flex items-center gap-4">
                <div class="w-16 text-sm font-medium text-gray-600">
                  {{ formatStatName(stat.stat.name) }}
                </div>
                <div class="w-8 text-sm font-semibold text-gray-900">
                  {{ stat.base_stat }}
                </div>
                <div class="flex-1">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div :class="getStatBarColor(stat.base_stat)" class="h-2 rounded-full transition-all duration-300"
                      :style="{ width: Math.min((stat.base_stat / 150) * 100, 100) + '%' }">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Total Stats -->
              <div class="flex items-center gap-4 border-t pt-4">
                <div class="w-16 text-sm font-medium text-gray-600">
                  Total
                </div>
                <div class="w-8 text-sm font-semibold text-gray-900">
                  {{ getTotalStats(pokemon.stats) }}
                </div>
                <div class="flex-1">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full transition-all duration-300"
                      :style="{ width: Math.min((getTotalStats(pokemon.stats) / 600) * 100, 100) + '%' }">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Moves Section -->
        <div class="mt-6">
          <h3 class="font-bold text-lg py-2 text-white">MOVESET</h3>
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="grid grid-cols-2 gap-3">
              <!-- Level 1 Moves -->
              <div class="flex items-center gap-2">
                <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Level 1</span>
                <span class="text-sm font-medium text-gray-900">Tackle</span>
              </div>

              <div class="flex items-center gap-2">
                <span class="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">Level 3</span>
                <span class="text-sm font-medium text-gray-900">Vine whip</span>
              </div>

              <div class="flex items-center gap-2">
                <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Level 1</span>
                <span class="text-sm font-medium text-gray-900">Growl</span>
              </div>

              <div class="flex items-center gap-2">
                <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Level 6</span>
                <span class="text-sm font-medium text-gray-900">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
