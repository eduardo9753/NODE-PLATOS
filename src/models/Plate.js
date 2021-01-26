const { Schema , model } = require('mongoose');

//MODELO DE DATOS
const PlateSchema = new Schema({
  foto        : {
     type : String 
  },//ESTE CAMPO VIENE SER EL originalname
  nombre      : { 
    type: String 
  },
  description : { 
    type:String
  },
  nivel       : { 
    type :String
  },
  precio      : { 
    type:String 
  },
  filename    : { 
    type : String
  },
  path        : {
    type : String 
  },
  mimetype    : { 
    type : String 
  },
  tamanio     : { 
    type :Number 
  },
  user        : { 
    type : String 
  }
}, {
  timestamps : true  
});

module.exports = model('Plates' , PlateSchema);