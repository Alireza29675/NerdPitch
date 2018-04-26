const express = require('express');
const router = express.Router();

const user = require('../server/UserController');
const presentation = require('../server/PresentationController');;

const auth = require('../server/middlewares/auth');

// for the control of the presentation
router.get("/show/:url/control", auth.mustBeLoggedIn, presentation.control);

// route for going to presentations page
router.get('/presentations', auth.mustBeLoggedIn, user.presentations);

// route for creating new presentation
router.get('/presentations/new', auth.mustBeLoggedIn, user.createPresentation);

// route for creating new presentation action
router.post('/presentations/new', auth.mustBeLoggedIn, presentation.create);

// show the presentation
router.get('/show/:url', presentation.show)

module.exports = router;