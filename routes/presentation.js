const express = require('express');
const router = express.Router();

const presentation = require('../server/PresentationController');;

const auth = require('../server/middlewares/auth');

router.get("/show/:url/PWA", auth.mustBeLoggedIn, presentation.PWA);

module.exports = router;