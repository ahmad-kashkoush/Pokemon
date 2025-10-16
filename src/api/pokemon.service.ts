import axios from 'axios'

const extractId = (url: string) => {
  const parts = url.split('/').filter(Boolean)
  const id = parts[parts.length - 1]
  return isNaN(Number(id)) ? null : Number(id)
}
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

  static async getEvolutionChainWithDetails(url: string) {
    const evolutionDataResponse = await axios.get(url)
    const evolutionData = evolutionDataResponse.data

    const pokemonIds: number[] = []
    const baseId = extractId(evolutionData.evolution_chain.url)
    if (baseId !== null) {
      pokemonIds.push(baseId)
    }

    const evolutionChainResponse = await axios.get(evolutionData.evolution_chain.url)
    const evolutionChain = evolutionChainResponse.data

    evolutionChain.chain.evolves_to.forEach((evo: any) => {
      const evoId = extractId(evo.species.url)
      if (evoId !== null) {
        pokemonIds.push(evoId)
      }

      evo.evolves_to.forEach((nextEvo: any) => {
        const nextEvoId = extractId(nextEvo.species.url)
        if (nextEvoId !== null) {
          pokemonIds.push(nextEvoId)
        }
      })
    })
    const evolutionDetails = await Promise.all(
      pokemonIds.filter((id) => id !== null).map((id) => this.getPokemonDetails(id)),
    )
    return evolutionDetails
  }
}
