const Presentation = require('./model/Presentation')

const socketioJwt = require('socketio-jwt');

const config = require('../config/config');

class Server {

    constructor() {
        this._io = null;
    }

    set io(io) {
        this._io = io;
        this.init();
    }

    get io() {
        return this._io;
    }

    init() {
        this._io.on('connection',
            (socket)=>{

                // for public use

                socket.on('connectToPresentation',(presentationUrl,cb)=>{
                    this.continueForGuestsPresentation(socket,presentationUrl);
                    cb(true)
                })

                // if he wants to access the admin section

                socket.on('authorize',()=>{
                    socketioJwt.authorize({
                        secret: config.auth.secret,
                        timeout: 1000 // 1 seconds to send the authentication message 
                    })(socket);
                })

            }
        ).on('authenticated', (socket) => {
            //this socket is authenticated, we are good to handle more events from it. 

            // let's add emits and ons for presentation shows

            this.continueForPresentation(socket);

        })
    }

    continueForPresentation(socket) {
        socket.on('connectToPresentationAsAdmin',  (presentationUrl, cb)=> {

            // check whether it is his/her presentation or not

            Presentation.findOne({
                url: presentationUrl
            }).then((data) => {
                
                if(!data.author.equals(socket.decoded_token._id)){
                    // presentation is not her/his presentation
                    return false;
                }
                
            });

            socket.join(presentationUrl);

            this._io.to(presentationUrl).emit('controlConnected');
            
            
            // events for admin presentation

            socket.on('disconnect',()=>{
                this._io.to(presentationUrl).emit('controlDisconnected');
            });

            socket.on('nextSlide',()=>{
                this._io.to(presentationUrl).emit('nextSlide');
            })

            socket.on('prevSlide',()=>{
                this._io.to(presentationUrl).emit('prevSlide');
            })

            cb(true);

        })
    }

    continueForGuestsPresentation(socket,presentationUrl){
            socket.join(presentationUrl);
    }

}

const server = new Server;

module.exports = server;