const { Router } = require('express');
const router = Router();


//PROTEGIENDO LAS RURAS
const { isAuthenticated } = require('../helpers/auth');

//CONTROLLOR PLATE
const {plateForm , plateFormAdd , paginacion , plateEdit , plateUpdate , plateDelete} = require('../controllers/plates.controllers');

router.get('/plate/Form' , isAuthenticated , plateForm);//VIEW DEL FORM PLATE DEL USER
router.post('/plate/FormAdd' , isAuthenticated , plateFormAdd);//RECOJO DE DATOS DE FORM PLATE DEL USER

router.get('/plate/list/:page' , isAuthenticated , paginacion);//VIEWS DE TODO LOS PLATOS POR PARTE DEL USER

router.get('/plate/edit/:id' , isAuthenticated , plateEdit);//DATA DEL PLATO POR ID DEL USER
router.put('/plate/edit/:id' , isAuthenticated , plateUpdate);//UPDATE DEL PLATO "EDIT" DEL USER

router.delete('/plate/delete/:id' , isAuthenticated , plateDelete);//ELIMANDO UN PLATO DEL USER


//EXPORTAMOS
module.exports = router;
