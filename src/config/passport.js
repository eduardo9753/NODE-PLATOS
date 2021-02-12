const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//MODEL USER
const User = require('../models/User');

//ENCRIPTACIONES
const { matchPass , encryptPass } = require('../helpers/auth');

//AUTEHNTICATION LOGIN SIGNIN (2)
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //con esto aparace el "done"
}, async (req, email, password, done) => {
    console.log('DATA FORM SIGNIN:' , req.body);
    const user = await User.findOne({ email : email });
    if(!user){
        return done(null , false , { message : 'NOT USER FOUNT'});
    } else {
        const match = await matchPass(password , user.password);
        if(match){
            console.log('LOGIN USER DATA :' , user);
            return done(null , user , req.flash('success_user' , 'WELCOME: ' , JSON.stringify(user.firt)));
        } else {
            return done(null , false , { message : 'PASSWORD INCORRECT...'});
        }
    } 
}));



//AUTHENTICATED REGISTER SIGNUP (1)
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('DATA USER : ', req.body);
    //VER SI YA EXISTE EL EMAIL
    const { firt , email } = req.body;
    const emailUser = await User.findOne({ email: email }).lean();
    if (emailUser) {
        req.flash('error_user', 'EL CORREO ESTA EN USO ACTUALMENTE, PRUEBE CON OTRO');
    } else {

        //CRIPTANDO CONTRASEÑA
        const user = new User();
        user.name  = username;
        user.firt  = firt;
        user.email = email;
        user.password = await encryptPass(password);

        await user.save()
            .then(user => {
            return done(null , user , req.flash('success_user' , 'WELCOME: ' , JSON.stringify(user.firt)));
        })
    }
}));



passport.serializeUser((user, done) => {
    console.log('SERIALIZEUSER USER : ', user);
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    console.log('DESERIALIZEUSER: ', id);
    User.findById(id, (err, user) => {
        done(err, user);
    })
});