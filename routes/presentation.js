const express = require('express');
const router = express.Router();

const presentation = require('../server/PresentationController');;

const auth = require('../server/middlewares/auth');

router.get("/show/:url/control", auth.mustBeLoggedIn, presentation.control);

module.exports = router;