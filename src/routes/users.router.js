//MODELO DE RUTAS
const { Router } = require('express');
const router = Router();


//CONTROLLERS INDEX
const usersController = require('../controllers/users.controllers');

router.get('/users/signup', usersController.singupForm);//FORM DE REGISTROS
router.post('/users/signupAdd' , usersController.singupFormAdd);//RECOGO DE DATOS DE FORM DE REGISTROS

router.get('/users/signin' , usersController.singinForm);//FORM DE LOGEO DE USUARIO
router.post('/users/signinApp' , usersController.singinFormAdd);//RECOGO DE DATOS PARA EL LOGEO

router.get('/users/logout' , usersController.logout);//LOGOUT DEL USER


//EXPORTAMOS LA RUTA
module.exports = router;
