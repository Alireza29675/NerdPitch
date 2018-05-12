const db = require('./db');

var SubscribeSchema = new db.Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(v).toLowerCase());
            }
        }
    },
    subscribedAt: {
        type: Date,
        default: Date.now()
    }
});

const Subscribe = db.model('Subscribe', SubscribeSchema);

module.exports = Subscribe;