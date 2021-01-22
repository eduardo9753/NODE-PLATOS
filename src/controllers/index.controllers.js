const indexController = {}

//MODELO PLATOS
const Plate = require('../models/Plate');

//MANEJOS DE LAS VITAS
indexController.index = (req , res) => {    
     res.render('index.hbs');
}

indexController.plates = async (req, res) =>{
     const plates = await Plate.find({ }).lean();
     console.log('data platos cliente: ', plates);
     res.render('plates.hbs' , { plates : plates});
}

indexController.view = async (req , res) => {
     const { id } = req.params;
     console.log('Id plate: ' , id);
     const plate = await Plate.findById( { _id : id }).lean();
     console.log('plate for id: ', plate);
     res.render('view.hbs' , { plate : plate });
}

indexController.mapa = (req , res) => {
     res.render('mapa.hbs');
}


//EXPORTAMOS EL CONTROLLERS PARA EL ROUTER
module.exports = indexController;