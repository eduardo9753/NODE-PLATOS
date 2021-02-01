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

/********FUNCION SUSTITUIDA POR LA PAGINACION*******/
indexController.plates = async (req, res) => {
     try {
          const plates = await Plate.find({}).lean();
          console.log('data platos cliente: ', plates);
          res.render('plates.hbs', { plates: plates });
     } catch (error) {
          console.log(error);
     }
}
//**************************************************/

indexController.paginate = async (req , res) => {
     try {
         let verPorPagina = 9;              //NUMEROS DE PAGINAS QUE VAS A VISUALIZAR
         let pagina = req.params.page || 1; //VARIABLE DE LA PAGINA QUE RECIVO DEL CLIENTE
         console.log('Pagina',pagina);
         const plates = await Plate.find({}).lean()
                                   .skip((pagina - 1)* verPorPagina)
                                   .limit(verPorPagina)
                                   .exec();
         let total = await Plate.count();   //CONTAMOS EL TOTAL DE DATOS
         console.log('Total', total);
         console.log('plates:' , plates);
         res.render('plates.hbs' , {
             plates  : plates,
             current : pagina,
             paginas : Math.ceil(total / verPorPagina)
         });
 
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