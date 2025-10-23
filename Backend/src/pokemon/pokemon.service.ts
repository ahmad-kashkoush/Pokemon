import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import axios from 'axios';
@Injectable()
export class PokemonService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPokemonDto: Prisma.PokemonCreateInput) {
    return this.databaseService.pokemon.create({
      data: createPokemonDto,
    });
  }

  async findAll() {
    return this.databaseService.pokemon.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.pokemon.findUnique({
      where: { id },
    });
  }
  async findOneDetails(nameOrId: string) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`,
    );
    return response.data;
  }

  async findEvolutionChain(id: string) {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const evolutionDataResponse = await axios.get(speciesUrl);
    const baseEvolution = evolutionDataResponse.data;

    const pokemonIds: number[] = [];
    const baseId = this.extractId(baseEvolution.evolution_chain.url);
    if (baseId !== null) {
      pokemonIds.push(baseId);
    }

    const evolutionChainResponse = await axios.get(
      baseEvolution.evolution_chain.url,
    );
    const evolutionChain = evolutionChainResponse.data;

    evolutionChain.chain.evolves_to.forEach((evo: any) => {
      const evoId = this.extractId(evo.species.url);
      if (evoId !== null) {
        pokemonIds.push(evoId);
      }

      evo.evolves_to.forEach((nextEvo: any) => {
        const nextEvoId = this.extractId(nextEvo.species.url);
        if (nextEvoId !== null) {
          pokemonIds.push(nextEvoId);
        }
      });
    });
    const evolutionDetails = await Promise.all(
      pokemonIds
        .filter((id) => id !== null)
        .map((id) => this.findOneDetails('' + id)),
    );
    return evolutionDetails;
  }
  async truncateAll() {
    await this.databaseService.$transaction([
      this.databaseService.pokemonTeamMember.deleteMany(),
      this.databaseService.pokemonDetails.deleteMany(),
      this.databaseService.pokemon.deleteMany(),
    ]);
  }

  extractId = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    const id = parts[parts.length - 1];
    return isNaN(Number(id)) ? null : Number(id);
  };
}
