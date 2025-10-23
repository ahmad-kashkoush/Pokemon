import { Module } from '@nestjs/common';
import { PokemonTeamMemberService } from './pokemon-team-member.service';
import { PokemonTeamMemberController } from './pokemon-team-member.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PokemonTeamMemberController],
  providers: [PokemonTeamMemberService],
})
export class PokemonTeamMemberModule {}
