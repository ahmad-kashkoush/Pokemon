import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PokemonTeamMemberService } from './pokemon-team-member.service';
import { Prisma } from '@prisma/client';

@Controller('team')
export class PokemonTeamMemberController {
  constructor(
    private readonly pokemonTeamMemberService: PokemonTeamMemberService,
  ) {}

  @Post()
  create(
    @Body() createPokemonTeamMemberDto: Prisma.PokemonTeamMemberCreateInput,
  ) {
    return this.pokemonTeamMemberService.create(createPokemonTeamMemberDto);
  }

  @Get()
  findAll() {
    return this.pokemonTeamMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonTeamMemberService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonTeamMemberService.remove(+id);
  }
}
