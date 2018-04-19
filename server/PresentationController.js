const Presentation = require('./model/Presentation')

var presentationController = {};

// Restrict access to root page
presentationController.show = function(req, res) {
    console.log(req.url)
}

module.exports = presentationController;