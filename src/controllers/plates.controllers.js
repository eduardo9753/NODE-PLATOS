const { unlink } = require('fs-extra');//PARA ELIMINAR LA IMA POR POR EL ID
const pathUpdate = require('path');
const pathDelete = require('path');

const Plate = require('../models/Plate');

class platesController {

    //VIEWS CAUNDO EL USER ESTA AUTENTICADO
    plateForm = (req, res) => {//VIEW FORM PLATE
        try {
            res.render('plate/plateForm.hbs');
        } catch (error) {
            console.log(error);
        }
    }

    plateFormAdd = async (req, res) => {//RECOJO DE DATOS DE FORM PLATE
        try {
            console.log('data plate: ', req.body); console.log('data plate: ', req.file);
            const plate = new Plate();
            plate.foto        = req.file.originalname;         //VALOR REQ.FILE : nombre original :"imagen.jpg"
            plate.nombre      = req.body.name;                 //CAJA DE TEXTO
            plate.description = req.body.description;          //CAJA DE TEXTO
            plate.nivel       = req.body.nivel;                //CAJA DE TEXTO
            plate.precio      = req.body.precio;               //CAJA DE TEXTO
            plate.filename    = req.file.filename;             //NOMBRE ENCRYPTADO DE LA IMG
            plate.path        = 'uploads/' + req.file.filename;//CUANDO RECORRA LAS IMG BUSCARA ESTA RUTA 
            plate.mimetype    = req.file.mimetype;             //YA QUE PUBLIC ESTA "PUBLICO" BUSCARA LA RUTA EN EL SERVER
            plate.tamanio     = req.file.size;                 //VALOR REQ.FILE :tamano de la img : 345kv
            plate.user        = req.user._id;                   //ASIGNAMOS EL ID DEl USER LA SESSION MUY IMPORTANTE
            console.log('REQ USER : ', req.user);
            const correct = await plate.save();
            if (correct) {
                req.flash('success_user', 'SAVE CORRECT');
                res.redirect('/plate/list/1');
            } else {
                req.flash('error_user', 'NO SE PUEDO GUARDAR :(...');
                res.redirect('/plate/list/1');
            }
        } catch (error) {
            console.log(error);
        }
    }


    /********FUNCION SUSTITUIDA POR LA PAGINACION*******/
    plateList = async (req, res) => {
        try {
            const plates = await Plate.find({ user: req.user.id }).sort({ createdAt: 'DESC' }).lean();
            console.log('list Plate: ', plates);
            res.render('plate/plateList.hbs', { plates: plates });
        } catch (error) {
            console.log(error);
        }
    }
    //**************************************************/


    paginacion = async (req, res) => {
        try {
            let verPorPagina = 9;
            let pagina = req.params.page || 1;
            const plates = await Plate.find({ user: req.user.id }).sort({ createdAt: 'DESC' }).lean()
                .skip((pagina - 1) * verPorPagina)
                .limit(verPorPagina)
                .exec();
            console.log('DATA PLATE PAGINATION : ' , plates);
            let total = await Plate.countDocuments();
            res.render('plate/plateList.hbs', {
                plates: plates,
                current: pagina,
                paginas: Math.ceil(total / verPorPagina)
            });
        } catch (error) {
            console.log(error);
        }
    }

    plateEdit = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Plate.findById({ _id: id }).lean();
            console.log('DATA UPDATE PLATE: ', data);
            res.render('plate/plateEdit.hbs', { data: data });
        } catch (error) {
            console.log(error);
        }
    }

    plateUpdate = async (req, res) => {
        try {
            console.log('DATA UPDATE FOTO REQ:', req.body);
            console.log('DATA UPDATE FOTO FILE:', req.file);
            const { id } = req.params;
            if (typeof req.file !== 'undefined') {
                let foto        = req.file.originalname;    //VALOR REQ.FILE : nombre original :"imagen.jpg"
                let nombre      = req.body.name;            //CAJA DE TEXTO
                let description = req.body.description;     //CAJA DE TEXTO
                let nivel       = req.body.nivel;           //CAJA DE TEXTO
                let precio      = req.body.precio;          //CAJA DE TEXTO     
                let filename    = req.file.filename;        //NOMBRE ENCRYPTADO DE LA IMG
                let path        = 'uploads/' + req.file.filename;  //ALMACENA LA RUTA NUEVA DE LA IMG' 
                let mimetype    = req.file.mimetype;        //VALOR REQ.FILE : extension de la imagen : image/jpeg
                let tamanio     = req.file.size;            //VALOR REQ.FILE :tamano de la img : 345kv
                let user        = req.user._id;              //ASIGNAMOS EL ID DE LA SESSION MUY IMPORTANTE
                const update = await Plate.findByIdAndUpdate(id, {
                    foto, nombre, description, nivel, precio, filename, path, mimetype, tamanio, user
                });
                if (update) {
                    console.log('RUTA ANTERIOR :', update.path);
                    await unlink(pathUpdate.resolve('./src/public/' + update.path));
                    req.flash('success_user', 'UPDATE SUCCESS PLATE');
                    res.redirect('/plate/list/1');
                } else {
                    req.flash('error_user', 'ERROR UPDATE PLATE');
                    res.redirect('/plate/list/1');
                }
            } else if (typeof req.file === 'undefined') {
                const plateUpdate = Plate.findById({ _id: id });
                console.log('DATA UPDATE SIN FILE: ', plateUpdate);
                let foto        = plateUpdate.originalname; //MISMO VALOR DE LA BD
                let nombre      = req.body.name;            //CAJA DE TEXTO
                let description = req.body.description;     //CAJA DE TEXTO
                let nivel       = req.body.nivel;           //CAJA DE TEXTO
                let precio      = req.body.precio;          //CAJA DE TEXTO
                let filename    = plateUpdate.filename;     //MISMO VALOR DE LA BD NOMBRE ENCRYPTADO DE LA IMG
                let path        = req.body.foto_actual;     //USAMOS LA RUTA ORIGINAL SI NO SE ACTUALIZA
                let mimetype    = plateUpdate.mimetype;     //MISMO VALOR DE LA BD :extension de la imagen : image/jpeg
                let tamanio     = plateUpdate.tamanio;      //MISMO VALOR DE LA BD :tamano de la img : 345kv
                let user        = req.user._id;
                const update = await Plate.findByIdAndUpdate(id, {
                    foto, nombre, description, nivel, precio, filename, path, mimetype, tamanio , user
                });
                if (update) {
                    console.log('RUTA ANTERIO :', update.path);
                    req.flash('success_user', 'UPDATE SUCCESS PLATE');
                    res.redirect('/plate/list/1');
                } else {
                    req.flash('error_user', 'ERROR UPDATE PLATE');
                    res.redirect('/plate/list/1');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    plateDelete = async (req, res) => {
        try {
            const { id } = req.params;
            const plate  = await Plate.findByIdAndDelete(id);
            console.log('path plate: ', plate.path)
            if (plate) {
                await unlink(pathDelete.resolve('./src/public/' + plate.path));
                req.flash('success_user', 'DELETED SUCCESS PLATE');
                res.redirect('/plate/list/1');
            } else {
                req.flash('error_user', 'ERROR DE ELIMANACION');
                res.redirect('/plate/list/1');
            }
        } catch (error) {
            console.log(error);
        }
    }
}


//EXPORTAMOS
module.exports = new platesController();