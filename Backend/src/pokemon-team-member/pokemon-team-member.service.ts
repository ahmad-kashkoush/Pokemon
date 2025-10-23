import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PokemonTeamMemberService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createPokemonTeamMemberDto: Prisma.PokemonTeamMemberCreateInput,
  ) {
    const count = await this.databaseService.pokemonTeamMember.count();
    if (count >= 6) {
      throw new Error('A team can have a maximum of 6 members.');
    }
    return this.databaseService.pokemonTeamMember.create({
      data: createPokemonTeamMemberDto,
    });
  }

  async findAll() {
    return this.databaseService.pokemonTeamMember.findMany({
      include: { pokemon: true },
    });
  }

  async findOne(pokemonId: number) {
    return this.databaseService.pokemonTeamMember.findUnique({
      where: { pokemonId },
    });
  }

  async remove(pokemonId: number) {
    return this.databaseService.pokemonTeamMember.delete({
      where: { pokemonId },
    });
  }
}
