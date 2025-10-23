const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/pokemon'; // Adjust if your server runs on a different port
async function deleteAll() {
  try {
    await axios.delete(API_URL + '/all');
  } catch (err) {
    console.error(
      'Error deleting all records:',
      err.response?.data || err.message,
    );
  }
}
async function generateData() {
  const dataPath = path.join(__dirname, 'pokemon.json');
  const pokemons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const poke of pokemons) {
    try {
      await axios.post(API_URL, {
        id: poke.id,
        name: poke.name,
        sprites: poke.sprites,
        types: poke.types,
        // Add other fields as needed
      });
      console.log(`Inserted: ${poke.name}`);
    } catch (err) {
      console.error(
        `Error inserting ${poke.name}:`,
        err.response?.data || err.message,
      );
    }
  }
  console.log('Done!');
}
async function main() {
  await deleteAll();
  await generateData();
}

main();
