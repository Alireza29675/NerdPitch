var mongoose = require("mongoose");
var passport = require("passport");
var User = require("./model/User");
var Presentation = require('./model/Presentation');


var userController = {};

// Restrict access to root page
userController.home = function(req, res) {

    // otherwise it renders home view
    res.render('users/home', { user: req.user, url: 'home', title: 'Home' });

};

// Go to registration page
userController.register = function(req, res) {
    res.render('users/register', { url: 'register', title: 'Register' });
};

// Post registration
userController.doRegister = function(req, res) {
    const data = {
        username : req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }
    User.register(new User(data), req.body.password, function(err, user) {
        if (err) {
            return res.render('users/register', { user: user, url: 'register', title: 'Register' });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
};

// Go to login page
userController.login = function(req, res) {
    res.render('users/login', { redirect: req.query.redirect || '/home', url: 'login', title: 'Login' });
};

// Post login
userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect(req.body.redirect || '/home');
    });
};

// logout
userController.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};

// presentations page
userController.presentations = function(req, res) {

    // otherwise it renders presentations view
    Presentation.find({ author: req.user._id }).exec((err, presentations) => {

        res.render('users/presentations/list', { user : req.user, presentations: presentations, url: 'presentations', title: 'Presentations' });

    })

};

// create presentation page
userController.createPresentation = function(req, res) {

    // otherwise it renders new presentation view
    res.render('users/presentations/new', { user: req.user, url: 'presentations/new', title: 'New Presentation' });

};

module.exports = userController;