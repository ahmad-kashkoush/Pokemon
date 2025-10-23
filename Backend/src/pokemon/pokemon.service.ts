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
  async truncateAll() {
    await this.databaseService.$transaction([
      this.databaseService.pokemon.deleteMany(),
      this.databaseService.pokemonDetails.deleteMany(),
    ]);
  }
}
