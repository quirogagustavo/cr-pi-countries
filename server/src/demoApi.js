const axios = require('axios');

async function llamarAPI() {
  try {
    const respuesta = await axios.get('http://localhost:5000/countries');
    return respuesta.data; // Devuelve los datos obtenidos de la API
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
}

async function mostrarDatos(){
    const datosApi= await llamarAPI();
    for (const user of datosApi) {
        console.log(user.cca3,'*/*',user.name.official,'/*/',user.flags.png,'*/*',user.continents[0]);
        console.log(user.capital,'*/*',user.subregion,'*/*',user.area,'*/*',user.population);
      }
}

mostrarDatos()