const { Schema , model } = require('mongoose');


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


//EXPORTAMOS
module.exports = model('User' , UserSchema);