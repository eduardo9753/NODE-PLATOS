const express        = require('express');
const morgan         = require('morgan'); //PETICIONES PARA EL SERVIDOR
const multer         = require('multer');//TRATAMIENTO DE IMG
const methodOverride = require('method-override');
const flash          = require('connect-flash');// PARA EL MANEJO DE MENSAJES
const session        = require('express-session');
const app            = express();
const socketIo       = require('socket.io');//MAPA EN VIVO
const Http           = require('http');
const path           = require('path'); //MANEJO DE DIRECCTORIOS
const { v4: uuidv4 } = require('uuid');
const exphbs         = require('express-handlebars'); //MOTOR DE PLATILLAS


//MANEJOR DE SESSIONES
const MongoStore     = require('connect-mongo')(session); //SE USA PARA GUARDAR SESSIONES EN MONGODB
const passport       = require('passport');               //PARA INICIAR PASSPORT
const connt          = require('./database/database');    //INSTANCIA DE MI BD PARA MONGOSTORE
const { timeago , isAuthenticated }  = require('./helpers/auth'); //AUTHENTICATION
const { firtPagina , paginationCliente , paginationUser , lastPagina } = require('./helpers/handlebars');
                                                          //PAGINATION
//INICIANDO SOCKET IO
const server = Http.createServer(app);
const io = socketIo().listen(server);
require('./socket')(io);


//IMPORTACIONES
const router         = require('./routes/index.router');
const users          = require('./routes/users.router');
const plate          = require('./routes/plate.router');
require('./config/passport');//INPORTAMOS LAS AUTHENTICACIONES DE USUARIO


//SETTING PORT
app.set('port' , process.env.PORT || 4006);

//SETTING VIEW
app.set('views' , path.join(__dirname, 'views'));
app.engine('.hbs' , exphbs( {
   defaultLayout : 'main',
   layoutsDir    : path.join(app.get('views') , 'layouts'),
   partialsDir   : path.join(app.get('views') , 'partials'),
   extname       : '.hbs',
   helpers       : { isAuthenticated , timeago , firtPagina , paginationCliente , paginationUser , lastPagina}
}));
app.set('view engine' , '.hbs');

//MIDDLEWARES
app.use(express.urlencoded({ extended : true }));
app.use(morgan('dev'));//PETICIONES PARA EL SERVIDOR
app.use(methodOverride('_method'));//PARA LOS ENVIOS DE FORMATO PUT Y DELETE
const storeImg = multer.diskStorage({
    destination  : path.join(__dirname, '/public/uploads/'),
    filename : (req , file , cb ) => {
        cb(null , uuidv4() + path.extname(file.originalname).toLowerCase());
    }
});
const imgUploads = multer({
    storage      : storeImg,
    dest         : path.join(__dirname , '/public/uploads/')
}).single('foto');
app.use(imgUploads);

//MENSAGES FLASH Y SESSION
app.use(session({
    secret       : process.env.SESSION_SECRET || 'secret',
    resave       : false ,
    saveUninitialized : false,
    store        : new MongoStore({ mongooseConnection : connt.connection })//GUARDAMOS LA SESSION EN LA BD PARA
}));                                                                //MANTENERLO
app.use(passport.initialize());//INICIALIZANDO PASSPORT
app.use(passport.session());//INICIALIZANDO PASSPORT
app.use(flash());
app.use((req , res , next) => {
    res.locals.success_user = req.flash('success_user');
    res.locals.error_user   = req.flash('error_user');
    res.locals.error        = req.flash('error');//ESTE ERROR ES PARA LAS AUTENTICACIONES
    res.locals.user         = req.user || null; // GUARDANDO EL USER EN LA MEMORIA CUANDO 
    next();                            //SE ABRA UNA PESTAÑA MOSTRARA LA CUENTA DEL USUARIO 
});


//MANEJO DE RUTAS PARA LAS VIEWS
app.use(router);
app.use(users);
app.use(plate);

//STATIC PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port') , () => {
    console.log('SERVER RUIING :' , app.get('port'));
})


//EXPORTAMOS APP
module.exports = server;