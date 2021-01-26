const indexController = {}

//MODELO PLATOS
const Plate = require('../models/Plate');

//MANEJOS DE LAS VITAS
indexController.index = (req, res) => {
     try {
          res.render('index.hbs');
     } catch (error) {
          console.log(error);
     }
}

indexController.plates = async (req, res) => {
     try {
          const plates = await Plate.find({}).lean();
          console.log('data platos cliente: ', plates);
          res.render('plates.hbs', { plates: plates });
     } catch (error) {
          console.log(error);
     }
}

indexController.view = async (req, res) => {
     try {
          const { id } = req.params;
          console.log('Id plate: ', id);
          const plate = await Plate.findById({ _id: id }).lean();
          console.log('plate for id: ', plate);
          res.render('view.hbs', { plate: plate });
     } catch (error) {
          console.log(error);
     }

}

indexController.mapa = (req, res) => {
     try {
          res.render('mapa.hbs');
     } catch (error) {
          console.log(error);
     }
}


//EXPORTAMOS EL CONTROLLERS PARA EL ROUTER
module.exports = indexController;