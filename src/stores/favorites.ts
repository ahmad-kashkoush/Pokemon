import type { Pokemon } from '@/types/pokemon.type'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favoritePokemons = ref<Pokemon[]>([])

  // Initialize from localStorage
  const initializeFavorites = () => {
    const saved = localStorage.getItem('pokemon-favorites')
    if (saved) {
      try {
        favoritePokemons.value = JSON.parse(saved)
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
        favoritePokemons.value = []
      }
    }
  }

  // Save to localStorage
  const saveFavorites = () => {
    try {
      localStorage.setItem('pokemon-favorites', JSON.stringify(favoritePokemons.value))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }

  // Getters
  const favoriteIds = computed(() => favoritePokemons.value.map((p) => p.id))
  const favoritesCount = computed(() => favoritePokemons.value.length)

  const isFavorite = (pokemonId: number) => {
    return favoriteIds.value.includes(pokemonId)
  }

  // Actions
  const addToFavorites = (pokemon: Pokemon) => {
    if (!isFavorite(pokemon.id)) {
      favoritePokemons.value.push(pokemon)
      saveFavorites()
    }
  }

  const removeFromFavorites = (pokemonId: number) => {
    const index = favoritePokemons.value.findIndex((p) => p.id === pokemonId)
    if (index > -1) {
      favoritePokemons.value.splice(index, 1)
      saveFavorites()
    }
  }

  const toggleFavorite = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFromFavorites(pokemon.id)
    } else {
      addToFavorites(pokemon)
    }
  }

  const clearFavorites = () => {
    favoritePokemons.value = []
    saveFavorites()
  }

  const getFavoriteById = (pokemonId: number) => {
    return favoritePokemons.value.find((p) => p.id === pokemonId)
  }

  // Initialize favorites on store creation
  initializeFavorites()

  return {
    // State
    favoritePokemons,

    // Getters
    favoriteIds,
    favoritesCount,
    isFavorite,
    getFavoriteById,

    // Actions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    initializeFavorites,
  }
})
