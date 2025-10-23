import type { Pokemon } from '@/types/pokemon.type'
import { ref, computed } from 'vue'

export function usePokemonCollection() {
  const pokemons = ref<Pokemon[]>([])

  const pokemonIds = computed(() => pokemons.value.map((p) => p.id))
  const count = computed(() => pokemons.value.length)

  const contains = (pokemonId: number) => {
    return pokemonIds.value.includes(pokemonId)
  }

  const getById = (pokemonId: number) => {
    return pokemons.value.find((p) => p.id === pokemonId)
  }

  const add = (pokemon: Pokemon) => {
    if (!contains(pokemon.id)) {
      pokemons.value.push(pokemon)
      return true
    }
    return false
  }

  const remove = (pokemonId: number) => {
    const index = pokemons.value.findIndex((p) => p.id === pokemonId)
    if (index > -1) {
      pokemons.value.splice(index, 1)
      return true
    }
    return false
  }

  const toggle = (pokemon: Pokemon) => {
    if (contains(pokemon.id)) {
      return remove(pokemon.id)
    } else {
      return add(pokemon)
    }
  }

  const clear = () => {
    pokemons.value = []
  }

  return {
    // State
    pokemons,

    // Getters
    pokemonIds,
    count,
    contains,
    getById,

    // Actions
    add,
    remove,
    toggle,
    clear,
  }
}
