var mongoose = require("mongoose");
var passport = require("passport");
var User = require("./model/User");
var Presentation = require('./model/Presentation');

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    // otherwise it renders home view
    res.render('users/home', { user : req.user });

};

// Go to registration page
userController.register = function(req, res) {
    res.render('users/register');
};

// Post registration
userController.doRegister = function(req, res) {
    User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
        if (err) {
            return res.render('users/register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
};

// Go to login page
userController.login = function(req, res) {
    res.render('users/login', { redirect: req.query.redirect || '/home' });
};

// Post login
userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect(req.param('redirect') || '/home');
    });
};

// logout
userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

// presentations page
userController.presentations = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login?redirect=/presentations');

    // otherwise it renders presentations view
    Presentation.find({ author: req.user._id }).exec((err, presentations) => {

        res.render('users/presentations/list', { user : req.user, presentations: presentations });

    })

};

// create presentation page
userController.createPresentation = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login?redirect=/presentations/new');

    // otherwise it renders new presentation view
    res.render('users/presentations/new', { user: req.user });

};

module.exports = userController;