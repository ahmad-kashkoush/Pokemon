import axios from 'axios'

export class PokemonService {
  static async getPokemonList() {
    // const response = await axios.get(
    //   'https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon',
    // )
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon`)
    return response.data
  }

  static async getPokemonDetails(nameOrId: string | number) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${nameOrId}`)
    return response.data
  }

  static async getEvolutionChainWithDetails(pokemonId: string) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/pokemon/evolution-chain/${pokemonId}`,
    )
    return response.data
  }
}
