import axios from 'axios'

export class PokemonService {
  static async getPokemonList() {
    const response = await axios.get(
      'https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon',
    )
    return response.data
  }

  static async getPokemonDetails(nameOrId: string | number) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
    return response.data
  }
}
