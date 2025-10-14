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
