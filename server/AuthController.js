var mongoose = require("mongoose");
var passport = require("passport");
var User = require("./model/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    // otherwise it renders home view
    res.render('user/home', { user : req.user });
    
};

// Go to registration page
userController.register = function(req, res) {
    res.render('user/register');
};

// Post registration
userController.doRegister = function(req, res) {
    User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
        if (err) {
            return res.render('user/register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
};

// Go to login page
userController.login = function(req, res) {
    res.render('user/login');
};

// Post login
userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/home');
    });
};

// logout
userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = userController;