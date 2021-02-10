//MODELO DE RUTAS
const { Router } = require('express');
const router = Router();


//CONTROLLERS INDEX
const {index , paginate , view , mapa} = require('../controllers/index.controllers');

router.get('/', index);//VIEW INDEX O HOME
router.get('/plates/:page' , paginate);//VIEW DE LOS PLATOS
router.post('/view/:id' , view);//VIEW PLATE POR ID
router.get('/mapa' , mapa);//VIEW MAPA


//EXPORTAMOS LA RUTA
module.exports = router;
