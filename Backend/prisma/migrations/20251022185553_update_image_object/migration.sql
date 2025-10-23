/*
  Warnings:

  - You are about to drop the column `front_default` on the `pokemons` table. All the data in the column will be lost.
  - Added the required column `sprites` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "front_default",
ADD COLUMN     "sprites" JSONB NOT NULL;
