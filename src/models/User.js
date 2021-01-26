const { Schema , model } = require('mongoose');

//METODO DE SCRIPTACION
const bycrypt = require('bcryptjs');

//MODELADO DE DATOS
const UserSchema = new Schema({
    name :     { 
        type : String
    } ,
    firt :     { 
        type : String 
    } ,
    email :    { 
        type : String ,
        unique:true
    } ,
    password : {
         type : String
    }
}, {
    timestamps : true
});


//ENCRIPTACIONES
UserSchema.methods.encryPass = async (password) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password , salt);//ENCRIPTANDO
}

UserSchema.methods.matchPass = async function(password) {
    return await bycrypt.compare(password, this.password);
}

//EXPORTAMOS
module.exports = model('User' , UserSchema);