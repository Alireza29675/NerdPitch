const io = require('socket.io-client');

class ClientSocket{
    constructor(token){

        this._token = token;

    }

    connect(){
        
        this._socket = io.connect('/');

        this._socket.on('connect', ()=> {
            // console.log(socket)
            this._socket.on('authenticated', function () {
                //do other things 
                
              }).emit('authenticate', {token: this._token}) //send the jwt 
          });

    }

}

module.exports = ClientSocket;