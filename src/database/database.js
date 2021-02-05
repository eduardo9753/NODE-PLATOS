const mongoose = require('mongoose');
const  { database } = require('./keys.js');

//CONEXION
mongoose.connect(database.URI ,{
    useNewUrlParser : true ,
    useUnifiedTopology : true 
}).then( (bd) => console.log('Conectado :)'))
  .catch( (err) => console.log(err));

  const db = mongoose.connection;
  db.on('error' , console.error.bind(console, "Connection error :"));
  db.on('open', () => {
    console.log("Connected");
});

//EXPORTAMOS
module.exports = mongoose;