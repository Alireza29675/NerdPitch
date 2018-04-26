const io = require('socket.io-client');

class ClientSocket{
    constructor(token){

        this._token = token;

    }

    connect(){

        return new Promise((resolve, reject)=>{
            this._socket = io.connect('/');

        this._socket.on('connect', ()=> {
            // console.log(socket)
            this._socket.on('authenticated', function () {
                //do other things 
                
              }).emit('authenticate', {token: this._token}) //send the jwt 
          });
        })
        
        

    }

    listenOnEvents(){

    }

}

module.exports = ClientSocket;