/*
  Warnings:

  - You are about to drop the column `teamId` on the `pokemon_team_members` table. All the data in the column will be lost.
  - You are about to drop the `pokemon_teams` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pokemonId]` on the table `pokemon_team_members` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."pokemon_team_members" DROP CONSTRAINT "pokemon_team_members_teamId_fkey";

-- DropIndex
DROP INDEX "public"."pokemon_team_members_teamId_pokemonId_key";

-- AlterTable
ALTER TABLE "pokemon_team_members" DROP COLUMN "teamId";

-- DropTable
DROP TABLE "public"."pokemon_teams";

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_team_members_pokemonId_key" ON "pokemon_team_members"("pokemonId");
