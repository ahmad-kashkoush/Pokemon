const axios = require('axios');

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


module.exports = deleteAll;
deleteAll();