const { Router } = require('express');
const router = Router();


//PROTEGIENDO LAS RURAS
const { isAuthenticated } = require('../helpers/auth');

//CONTROLLOR PLATE
const platesController = require('../controllers/plates.controllers');

router.get('/plate/Form' , isAuthenticated , platesController.plateForm);//VIEW DEL FORM PLATE DEL USER
router.post('/plate/FormAdd' , isAuthenticated , platesController.plateFormAdd);//RECOJO DE DATOS DE FORM PLATE DEL USER

router.get('/plate/list' , isAuthenticated , platesController.plateList);//VIEWS DE TODO LOS PLATOS POR PARTE DEL USER

router.get('/plate/edit/:id' , isAuthenticated , platesController.plateEdit);//DATA DEL PLATO POR ID DEL USER
router.put('/plate/edit/:id' , isAuthenticated , platesController.plateUpdate);//UPDATE DEL PLATO "EDIT" DEL USER

router.delete('/plate/delete/:id' , isAuthenticated , platesController.plateDelete);//ELIMANDO UN PLATO DEL USER

//EXPORTAMOS
module.exports = router;
