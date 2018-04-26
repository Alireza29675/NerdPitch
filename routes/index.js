const express = require('express');
const router = express.Router();

const user = require('../server/UserController');
const presentation = require('../server/PresentationController');

const auth = require('../server/middlewares/auth');

router.get('/', (req, res, err) => {

    // redirects user to /home if he/she has logged in already
    if (req.isAuthenticated()) return res.redirect('/home');

    // otherwise renders index view
    res.render('index');

});

const setUserRoutes = () => {

    // restrict index for logged in user only
    router.get('/home', auth.mustBeLoggedIn, user.home);

    // route to register page
    router.get('/register', auth.mustNotBeLoggedIn, user.register);

    // route for register action
    router.post('/register', auth.mustNotBeLoggedIn, user.doRegister);

    // route to login page
    router.get('/login', auth.mustNotBeLoggedIn, user.login);

    // route for login action
    router.post('/login', auth.mustNotBeLoggedIn, user.doLogin);

    // route for logout action
    router.get('/logout', auth.mustBeLoggedIn, user.logout);

    // route for going to presentations page
    router.get('/presentations', auth.mustBeLoggedIn, user.presentations);

    // route for creating new presentation
    router.get('/presentations/new', auth.mustBeLoggedIn, user.createPresentation);

    // route for creating new presentation action
    router.post('/presentations/new', auth.mustBeLoggedIn, presentation.create);

}

const setPresentationRoutes = () => {
    router.get('/show/:url', presentation.show)
}

setUserRoutes();

setPresentationRoutes();

module.exports = router;