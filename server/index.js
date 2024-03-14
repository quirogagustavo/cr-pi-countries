//const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const migrarDatos=require('../server/src/utils/migrarDatos.js')
const PORT = 3001;
// console.log('Estoy en el index')
conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  migrarDatos()
})
}).catch(error => console.error(error))
