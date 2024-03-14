const axios = require('axios');
const {Country} = require('../db')

async function llamarAPI() {
  try {
    const respuesta = await axios.get('http://localhost:5000/countries');
    return respuesta.data; // Devuelve los datos obtenidos de la API
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
}

async function migrarDatos(){
    const datosApi= await llamarAPI();
    for (const country of datosApi) {
        // console.log(user.cca3,'*/*',user.name.official,'/*/',user.flags.png,'*/*',user.continents[0]);
        // console.log(user.capital,'*/*',user.subregion,'*/*',user.area,'*/*',user.population);
        await Country.create({id: country.cca3, name: country.name.official,
        flag: country.flags.png, continente:country.continents[0],
        capital: country.capital, subregion: country.subregion, area:country.area, poblacion: country.population
        })
      }
}

module.exports=migrarDatos