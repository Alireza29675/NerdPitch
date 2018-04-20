const db = require('./db');
const md5 = require('md5');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new db.Schema({
    username: String,
    password: String,
    email: { type: String, required: true, unique: true },
    firstname: String,
    lastname: String,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UserSchema.virtual('name').get(function () {
  return this.firstname + ' ' + this.lastname;
});

UserSchema.virtual('gravatar').get(function () {
    return 'https://www.gravatar.com/avatar/' + md5(this.email);
});

UserSchema.plugin(passportLocalMongoose);

const User = db.model('User', UserSchema);

module.exports = User;