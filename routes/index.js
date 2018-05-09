const express = require('express');
const router = express.Router();

const user = require('../server/UserController');

const auth = require('../server/middlewares/auth');

router.get('/', (req, res, err) => {

    // redirects user to /home if he/she has logged in already
    if (req.isAuthenticated()) return res.redirect('/home');

    // otherwise renders index view
    res.render('index');

});

// restrict index for logged in user only
router.get('/home', auth.mustBeLoggedIn, user.home);

module.exports = router;