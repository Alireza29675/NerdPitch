const express = require('express');
const router = express.Router();

const ApiController = require('../server/ApiController');

router.post('/subscribe', ApiController.subscribe);

module.exports = router;