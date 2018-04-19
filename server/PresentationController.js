const Presentation = require('./model/Presentation')

var presentationController = {};

// Creating new Presentation
presentationController.create = function(req, res) {

    console.log(res.data)

}

// Showing Presentation
presentationController.show = function(req, res) {

    Presentation.findOne({ url: req.params.url }).populate('author').exec((err, presentation) => {
        
        // if couldn't find presentation
        if (err || !presentation) {
            const message = `Oops! We couldn't find /${req.params.url}`;
            res.locals.message = message;
            res.status(404);
            res.locals.error = {
                message: message,
                status: 404
            };
            return res.render('error')
        }

        // if it could find presentation, it would shown that
        res.render('presentations/show', { presentation: presentation })

    })
    
}

module.exports = presentationController;