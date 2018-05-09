const express = require('express');
const router = express.Router();

const user = require('../server/UserController');

const auth = require('../server/middlewares/auth');

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

module.exports = router;