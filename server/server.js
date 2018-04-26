const socketioJwt = require('socketio-jwt');

const config = require('../config/config');

class Server {

    constructor () {
        this._io = null;
    }

    set io (io) {
        this._io = io;
        this.init();
    }

    get io () {
        return this._io;
    }

    init () {
        this.io.on('connection', socketioJwt.authorize({
            secret: config.auth.secret,
            timeout: 1000 // 1 seconds to send the authentication message 
          })).on('authenticated', function(socket) {
            //this socket is authenticated, we are good to handle more events from it. 

          }).on("test",()=>{
              console.log("test")
          });
    }

}

const server = new Server;

module.exports = server;