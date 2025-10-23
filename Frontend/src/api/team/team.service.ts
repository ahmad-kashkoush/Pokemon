import axios from 'axios'

export class TeamService {
  static async getTeam() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/team/`)
    return response.data
  }
  static async teamCount() {
    const response = await this.getTeam()
    return response.length
  }
  static async isInTeam(pokemonId: number) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/team/${pokemonId}`)
    return response.data
  }
  static async addToTeam(pokemonId: number) {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/team/`, {
      pokemonId,
    })
    return response.data
  }
  static async removeFromTeam(pokemonId: number) {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/team/${pokemonId}`)
    return response.data
  }
  static async toggleTeamMember(pokemonId: number) {
    if (await this.isInTeam(pokemonId)) {
      return this.removeFromTeam(pokemonId)
    } else {
      return this.addToTeam(pokemonId)
    }
  }
}
