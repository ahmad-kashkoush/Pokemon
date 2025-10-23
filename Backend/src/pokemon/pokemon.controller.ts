import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Prisma } from '@prisma/client';
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: Prisma.PokemonCreateInput) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('/:id')
  findOneDetails(@Param('id') id: string) {
    return this.pokemonService.findOneDetails(id);
  }
  @Get('/evolution-chain/:id')
  findEvolutionChain(@Param('id') id: string) {
    return this.pokemonService.findEvolutionChain(id);
  }
  @Delete('/all')
  truncateAll() {
    return this.pokemonService.truncateAll();
  }
}
