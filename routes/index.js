const express = require('express');
const router = express.Router();

const auth = require('../server/AuthController');
const presentation = require('../server/PresentationController');

router.get('/', (req, res, err) => {

    // redirects user to /home if he/she has logged in already
    if (req.isAuthenticated()) return res.redirect('/home');

    // otherwise renders index view
    res.render('index');

});

const setUserRoutes = () => {

    // restrict index for logged in user only
    router.get('/home', auth.home);

    // route to register page
    router.get('/register', auth.register);

    // route for register action
    router.post('/register', auth.doRegister);

    // route to login page
    router.get('/login', auth.login);

    // route for login action
    router.post('/login', auth.doLogin);

    // route for logout action
    router.get('/logout', auth.logout);

}

const setPresentationRoutes = () => {
    router.get('/show/:url', presentation.show)
}

setUserRoutes();
setPresentationRoutes();

module.exports = router;