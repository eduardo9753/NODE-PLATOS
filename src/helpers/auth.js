const { format } = require('timeago.js');

const helpers = {};

//AUTENTICACION DEL USUARIO
helpers.isAuthenticated = (req, res , next) => {
   if(req.isAuthenticated()){
       return next();
   }
   req.flash('error' , 'NOT AUTHORIZED');
   res.redirect('/users/singin');
}


//FORMATO DE FECHAS
helpers.timeago = (timestamp) =>{ 
    return format(timestamp); 
}

//EXPORTAMOS
module.exports = helpers;