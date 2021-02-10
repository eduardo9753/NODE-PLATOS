//PASSPORT PARA LAS AUTENTICACIONES
const passport = require('passport');

class usersController {

     //MANEJOS DE LAS VITAS
     singupForm = (req, res) => {
          res.render('users/signup.hbs');
     }
     singupFormAdd = passport.authenticate('local.signup', {
          failureRedirect: '/users/signup',
          successRedirect: '/plate/list/1',
          failureFlash: true
     });


     singinForm = (req, res) => {
          res.render('users/signin');
     }
     singinFormAdd = passport.authenticate('local.signin', {
          failureRedirect: '/users/signin',
          successRedirect: '/plate/list/1',
          failureFlash: true
     });

     logout = (req, res) => {
          req.logout();
          req.flash('success_user', 'User EXIT');
          res.redirect('/users/signin');
     }

}


//EXPORTAMOS
module.exports = new usersController();