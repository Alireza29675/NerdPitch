const Presentation = require('./model/Presentation')
const User = require('../server/model/User')

const jwt = require('jsonwebtoken');

const config = require('../config/config');

var presentationController = {};

// Creating new Presentation
presentationController.create = function (req, res) {

    const data = {
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        url: req.body.url
    }

    const presentation = new Presentation(data);

    presentation.save((err) => {

        res.redirect('/presentations')

    })

}

// Showing Presentation
presentationController.show = function (req, res) {

    const presentationUrl = req.params.url;

    Presentation.findOne({
        url: presentationUrl
    }).populate('author').exec((err, presentation) => {

        // if couldn't find presentation
        if (err || !presentation) {
            console.log(err)
            const message = `Oops! We couldn't find /${presentationUrl}`;
            res.locals.message = message;
            res.status(404);
            res.locals.error = {
                message: message,
                status: 404
            };
            return res.render('error')
        }

        // if it could find presentation, it would shown that
        res.render('presentations/show', {
            presentation,
            presentationUrl
        })

    })

}

presentationController.control = function (req, res) {

    // let's find the title of the presentation

    Presentation.findOne({
        url: req.params.url
    }).then((data) => {

        if (!req.user._id.equals(data.author)) {
            // presentation is not his/her!
            res.sendStatus(403);
            return;
        }


        let token = jwt.sign(req.user._doc, config.auth.secret, {
            expiresIn: config.auth.lifeTime
        })

        return res.render('control/index', {
            token,
            title: data.title,
            presentationUrl: req.params.url
        });

    });



}

presentationController.edit = function (req, res) {
    const data = {
        url: req.body.url,
        title: req.body.title,
        content: req.body.content
    }
    console.log("salam")
    Presentation.update({
        url: data.url
    }, {
        title: data.title,
        content: data.content
    }).then(() => {
        res.redirect('/presentations');
    })

}

module.exports = presentationController;