## Setup
### Install packages
```bash
npm i
cd Backend/
npm install
cd ../Frontend/
npm install
```
### add envinronmental variables
#### Backend/.env
* Note: I've added a secret here for easier setup, this shouldn't be how it is done in a real world project. 
```
DATABASE_URL="postgresql://neondb_owner:npg_bYTMB8Jvq9So@ep-autumn-tree-aht4zuan-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

```
#### Frontend/.env
```
VITE_API_URL=http://localhost:3000
```

## Run

### generate prisma schema
* Note: Make sure to be in `Backend/` directory
```
npx prisma generate
```
### run front and backend servers
* Note: Make sure to be in root directory `/`
```
npm run dev
```

## Generate dumb Data
* Note: make sure to be in `Backend/` while running the commands
```
# First reset database
npm run reset-data

# Seed data
npm run seed-data
```
## Implemented Frontend requirements

### Core
- [x] Trainers can see a list of Pokémon with some general information, such as ==name, number, picture and types.==
- [x] Trainers can search for Pokémon by ==name and number.==
- [x] Trainers can see the details of a Pokémon, with the general info ==(name, number, picture, types) but also things like abilities, move set and stats.==
- [x] Trainers can mark a Pokémon as favourite (or remove it from favourites).
- [x] Trainers have a ==separate list with only their favourite Pokémon.==
- [x] Trainers can see a bigger version of the picture of a Pokémon (from the details of one). Include zoom & pan. (for web: we’re looking for a lightbox component)

### Nice to Have

- [x] Some trainers are forgetful, and don’t remember the name or number of a pokemon. Searching by type (such as “fire”) should also be possible.

- [x] Trainers are always on the road in search of new Pokémon so they don’t always have the best connection. The customer would like to have loading and error indicators when data can not be found or it takes long too long.
- [x] Besides their favourites, trainers would also like to manage their team of Pokémon. A trainer’s team is limited to 6 Pokémon.
- [x] Trainers would like to see more than one picture for Pokémon if available on the detail screen (think carousel like UI).

- [x] Trainers would like to see the evolutions of a Pokémon if available, from the detail screen. Given a details API response, you'll need to get the species detail first using https://pokeapi.co/api/v2/pokemon-species/133, from which you can get the evolution chain using https://pokeapi.co/api/v2/evolution-chain/67.

- [x] Some trainers have large devices. Your implementation should scale gracefully to larger screens. Even better would be to have a "split view", with the list of Pokémon on the left, and the details of one on the right.

## Implemented Backend requirements
### Core
* Implement the pre-defined OpenAPI spec. document (see attachment). This includes calls to:
  - [x] Get a list of Pokémon
  - [x] A Pokémon’s details
  - [x] CRUD calls to manage a team (limited to 6)
- Store Pokémons' information in a database
  - [x] Use an ORM with clearly defined models for each entity
  - [x] Use migrations as needed
- [x] Provide a command to import a dump / seed of Pokémon (see attachment).
- [x] Provide a command to import a Pokémon from an external service (see docs), given an external ID or name as parameter.

## Demo


https://github.com/user-attachments/assets/44de957e-72a3-4376-be12-0a2227d0e0e2


