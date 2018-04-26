const io = require('socket.io-client');

const token = window.token;


const socket = io.connect('/');

socket.on('connect', () => {
    
    socket.on('authenticated', function () {
        //do other things 

    }).emit('authenticate', {
        token
    }) //send the jwt 
});