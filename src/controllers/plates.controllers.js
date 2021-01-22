const { unlink } = require('fs-extra');//PARA ELIMINAR LA IMA POR POR EL ID
const pathUpdate = require('path');
const pathDelete = require('path'); 
/*class platesController  {
    plateForm = (req, res) => {//VIEW FORM PLATE
        res.render('plate/plateForm.hbs');
    }
}
module.exports = new platesController(); */
const platesController = {};

//MODELO PLATO
const Plate = require('../models/Plate');

//VIEWS CAUNDO EL USER ESTA AUTENTICADO
platesController.plateForm = (req, res) => {//VIEW FORM PLATE
    res.render('plate/plateForm.hbs');
}

platesController.plateFormAdd = async (req, res) => {//RECOJO DE DATOS DE FORM PLATE
    console.log('data plate: ' , req.body);console.log('data plate: ' , req.file);
    const plate = new Plate();
    plate.foto = req.file.originalname;
    plate.nombre = req.body.name;
    plate.description = req.body.description;
    plate.nivel = req.body.nivel;
    plate.precio = req.body.precio;
    plate.filename = req.file.filename;
    plate.path = 'uploads/' + req.file.filename;//CUANDO RECORRA LAS IMG BUSCARA ESTA RUTA 
    plate.mimetype = req.file.mimetype;           //YA QUE PUBLIC ESTA "PUBLICO" BUSCARA LA RUTA EN EL SERVER
    plate.size  = req.file.size;
    plate.user = req.user.id;//ASIGNAMOS EL ID DE LA SESSION MUY IMPORTANTE
    const correct = await plate.save();
    if(correct){
        req.flash('success_user' , 'SAVE CORRECT');
        res.redirect('/plate/list');
    }else{
        req.flash('error_user' , 'NO SE PUEDO GUARDAR :(...');
        res.redirect('/plate/list');
    }
}

platesController.plateList = async (req, res) => {
    const plates = await Plate.find({ user : req.user.id }).sort({createdAt : 'DESC'}).lean();
    console.log('list Plate: ', plates);
    res.render('plate/plateList.hbs' , { plates : plates });

}

platesController.plateEdit = async (req, res) => {
    const { id } = req.params;
    const data = await Plate.findById({ _id : id }).lean();
    console.log('DATA UPDATE PLATE: ' , data);
    res.render('plate/plateEdit.hbs' , { data : data});
}

platesController.plateUpdate = async (req , res) => {
    console.log('DATA UPDATE FOTO REQ:' , req.body);
    console.log('DATA UPDATE FOTO FILE:' , req.file);
    const { id } = req.params;
    if(req.file.originalname){
        let foto = req.file.originalname;       //nombre original :"imagen.jpg"
        let nombre = req.body.name;             //caja de texto
        let description = req.body.description; //caja  de texto
        let nivel = req.body.nivel;             //caja de texto
        let precio = req.body.precio;           //caja de texto     
        let filename = req.file.filename;  
        let path = 'uploads/' + req.file.filename;//almacena la ruta : 'uploads/nombre de la img encryptada' 
        let mimetype = req.file.mimetype;         //extension de la imagen : image/jpeg
        let size  = req.file.size;               //tamano de la img : 345kv
        const update = await Plate.findByIdAndUpdate(id ,{
            foto , nombre , description , nivel , precio , filename , path , mimetype , size
        });
        if(update){
            console.log('RUTA ANTERIO :' , update.path);
            await unlink(pathUpdate.resolve('./src/public/' + update.path));
            req.flash('success_user' , 'UPDATE SUCCESS PLATE');
            res.redirect('/plate/list');
        }else{
            req.flash('error_user' , 'ERROR UPDATE PLATE');
            res.redirect('/plate/list');
        }
    }
}

platesController.plateDelete = async (req, res) => {
   const { id } = req.params;
   const plate = await Plate.findByIdAndDelete(id);
   console.log('path plate: ', plate.path)
   if(plate){
       await unlink(pathDelete.resolve('./src/public/' + plate.path));
       req.flash('success_user' , 'DELETED SUCCESS PLATE');
       res.redirect('/plate/list');
   }else{
       req.flash('error_user' , 'ERROR DE ELIMANACION');
       res.redirect('/plate/list');
   }
}

//EXPORTAMOS
module.exports = platesController;