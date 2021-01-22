//MODELO DE RUTAS
const { Router } = require('express');
const router = Router();


//CONTROLLERS INDEX
const indexController = require('../controllers/index.controllers');

router.get('/', indexController.index);//VIEW INDEX O HOME
router.get('/plates' , indexController.plates);//VIEW DE LOS PLATOS
router.post('/view/:id' , indexController.view);//VIEW PLATE POR ID
router.get('/mapa' , indexController.mapa);//VIEW MAPA


//EXPORTAMOS LA RUTA
module.exports = router;
