const usersController = {}


//PASSPORT PARA LAS AUTENTICACIONES
const passport = require('passport');

//MANEJOS DE LAS VITAS
usersController.singupForm = (req , res) => {
     res.render('users/signup.hbs');
}
usersController.singupFormAdd = passport.authenticate('local.signup' , {
     failureRedirect : '/users/signup',
     successRedirect : '/plate/list',
     failureFlash : true
});


usersController.singinForm = (req, res) => { 
     res.render('users/signin');
}
usersController.singinFormAdd = passport.authenticate('local.signin' , {
     failureRedirect : '/users/signin',
     successRedirect : '/plate/list',
     failureFlash : true
});

usersController.logout = (req , res) => {
     req.logout();
     req.flash('success_user' , 'User EXIT');
     res.redirect('/users/signin');
}


//EXPORTAMOS
module.exports = usersController;