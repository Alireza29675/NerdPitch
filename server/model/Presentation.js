const db = require('./db');

var PresentationSchema = new db.Schema({
    title: String,
    content: String,
    author: { type: db.ObjectId, ref: 'UserSchema' },
    url: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
});

const Presentation = db.model('Presentation', PresentationSchema);

module.exports = Presentation;