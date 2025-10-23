import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonTeamMemberModule } from './pokemon-team-member/pokemon-team-member.module';

@Module({
  imports: [PokemonModule, DatabaseModule, PokemonTeamMemberModule],
  controllers: [AppController],
  providers: [AppService, PokemonService],
})
export class AppModule {}
