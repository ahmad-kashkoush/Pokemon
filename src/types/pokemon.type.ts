export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: Array<{
    slot: number
    type: {
      name: string
    }
  }>
}

export interface PokemonDetails extends Pokemon {
  height?: number
  weight?: number
  stats?: Array<{
    stat: {
      name: string
    }
    base_stat: number
  }>
  abilities?: Array<{
    ability: {
      name: string
    }
  }>
}
