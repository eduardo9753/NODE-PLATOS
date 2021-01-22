const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//MODEL USER
const User = require('../models/User');

//AUTEHNTICATION LOGIN SIGNIN (2)
passport.use('local.signin' , new LocalStrategy({
    usernameField : 'email' ,
    passwordField : 'password',
    passReqToCallback : true //con esto aparace el "done"
}, async (req , email , password , done) => {
    const user = await User.findOne({ email : email });
    if(!user){
        return done(null , false , { message : 'Not User Fount'});
    }else{
        const match = await user.matchPass(password);
        if(match){
            return done(null , user , req.flash('success_user', 'WELCOME : ' , JSON.stringify(user.firt)));
        }else{
            return done(null , false , { message : 'PASSWORD INCORRECT' });
        }
    }
}));
//AUTHENTICATED REGISTER SIGNUP (1)
passport.use('local.signup' , new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
} , async (req , username , password , done) => {
    console.log('DATA USER : ' , req.body);
        //VER SI YA EXISTE EL EMAIL
        const emailUser = await User.findOne({ email : req.body.email });
        if(emailUser){
             req.flash('error_user' , 'EL CORREO ESTA EN USO ACTUALMENTE, PRUEBE CON OTRO');
        } else {
             //CRIPTANDO CONTRASEÑA
             const newUser = await User( { username , firt: req.body.firt , email:req.body.email , password } );
             newUser.password = await newUser.encryPass(password);
             await newUser.save()
                          .then( newUser => {
                return done(null , newUser , req.flash('success_user' , 'REGISTRO COMPLETO'));
             })
        }
}));


passport.serializeUser((user , done) => {
    console.log('SERIALIZEUSER USER : ' , user);
    done(null , user._id);
});

passport.deserializeUser((_id , done) => {
    console.log('SERIALIZEUSER USER _id: ' , _id);
    User.findById(_id , (err , user) => {
        done(err , user);
    })
});