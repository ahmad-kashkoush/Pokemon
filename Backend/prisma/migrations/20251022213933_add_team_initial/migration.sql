/*
  Warnings:

  - You are about to drop the column `baseHappiness` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `captureRate` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `eggGroups` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `evolutionChain` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `genderRate` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `growthRate` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `habitat` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `shape` on the `pokemon_details` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pokemon_details` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `pokemon_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."pokemon_details" DROP CONSTRAINT "pokemon_details_pokemonId_fkey";

-- AlterTable
ALTER TABLE "pokemon_details" DROP COLUMN "baseHappiness",
DROP COLUMN "captureRate",
DROP COLUMN "color",
DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "eggGroups",
DROP COLUMN "evolutionChain",
DROP COLUMN "genderRate",
DROP COLUMN "growthRate",
DROP COLUMN "habitat",
DROP COLUMN "shape",
DROP COLUMN "updated_at",
ADD COLUMN     "abilities" JSONB,
ADD COLUMN     "baseExperience" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cries" JSONB,
ADD COLUMN     "forms" JSONB,
ADD COLUMN     "gameIndices" JSONB,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "heldItems" JSONB,
ADD COLUMN     "isDefault" BOOLEAN,
ADD COLUMN     "locationAreaEncounters" TEXT,
ADD COLUMN     "moves" JSONB,
ADD COLUMN     "order" INTEGER,
ADD COLUMN     "pastAbilities" JSONB,
ADD COLUMN     "pastTypes" JSONB,
ADD COLUMN     "speciesUrl" TEXT,
ADD COLUMN     "sprites" JSONB,
ADD COLUMN     "stats" JSONB,
ADD COLUMN     "types" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weight" INTEGER;

-- CreateTable
CREATE TABLE "pokemon_teams" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_team_members" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "pokemon_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_team_members_teamId_pokemonId_key" ON "pokemon_team_members"("teamId", "pokemonId");

-- AddForeignKey
ALTER TABLE "pokemon_details" ADD CONSTRAINT "pokemon_details_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_team_members" ADD CONSTRAINT "pokemon_team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "pokemon_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_team_members" ADD CONSTRAINT "pokemon_team_members_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
