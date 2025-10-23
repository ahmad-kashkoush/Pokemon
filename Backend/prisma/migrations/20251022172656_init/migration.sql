-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "front_default" TEXT NOT NULL,
    "types" JSONB NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "stats" JSONB,
    "abilities" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_details" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "description" TEXT,
    "habitat" TEXT,
    "color" TEXT,
    "shape" TEXT,
    "genderRate" INTEGER,
    "captureRate" INTEGER,
    "baseHappiness" INTEGER,
    "growthRate" TEXT,
    "eggGroups" JSONB,
    "evolutionChain" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_details_pokemonId_key" ON "pokemon_details"("pokemonId");

-- AddForeignKey
ALTER TABLE "pokemon_details" ADD CONSTRAINT "pokemon_details_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
