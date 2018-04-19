const db = require('./db');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new db.Schema({
    username: String,
    password: String,
    name: String
});

UserSchema.plugin(passportLocalMongoose);

const User = db.model('User', UserSchema);

module.exports = User;