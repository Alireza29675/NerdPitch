const express = require('express');
const router = express.Router();

const user = require('../server/UserController');
const presentation = require('../server/PresentationController');

router.get('/', (req, res, err) => {

    // redirects user to /home if he/she has logged in already
    if (req.isAuthenticated()) return res.redirect('/home');

    // otherwise renders index view
    res.render('index');

});

const setUserRoutes = () => {

    // restrict index for logged in user only
    router.get('/home', user.home);

    // route to register page
    router.get('/register', user.register);

    // route for register action
    router.post('/register', user.doRegister);

    // route to login page
    router.get('/login', user.login);

    // route for login action
    router.post('/login', user.doLogin);

    // route for logout action
    router.get('/logout', user.logout);

    // route for going to presentations page
    router.get('/presentations', user.presentations);

    // route for creating new presentation
    router.get('/presentations/new', user.createPresentation);

}

const setPresentationRoutes = () => {
    router.get('/show/:url', presentation.show)
}

setUserRoutes();
setPresentationRoutes();

module.exports = router;