const { format } = require('timeago.js');

const helpers = {};

//METODO DE SCRIPTACION
const bcrypt = require('bcryptjs');


//AUTENTICACION DEL USUARIO
helpers.isAuthenticated = (req, res , next) => {
   if(req.isAuthenticated()){
       return next();
   }
   req.flash('error' , 'NOT AUTHORIZED');
   res.redirect('/users/signin');
}


//FORMATO DE FECHAS
helpers.timeago = (timestamp) =>{ 
    return format(timestamp); 
}


//ENCRIPTACIONES
helpers.encryptPass = async (passport) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(passport , salt);
}

//DESENCRIPTANDO
helpers.matchPass = async function(password , savedPassword){
  try {
      return await bcrypt.compare(password , savedPassword);
  } catch (error) {
      console.log(error);
  }
}

//EXPORTAMOS
module.exports = helpers;