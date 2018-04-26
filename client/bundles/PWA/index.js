const io = require('socket.io-client');

const token = window.token;

const presentationUrl = window.presentationUrl;

const socket = io.connect('/');

socket.on('connect', () => {
    
    socket.on('authenticated', function () {
        //do other things 
        socket.emit('connectToPresentationAsAdmin',presentationUrl,(response)=>{
            if(response){
                // some code
                $("input[value=next]").onclick = ()=>{
                    console.log('next')
                    socket.emit('nextSlide');
                }
                $("input[value=prev]").onclick = ()=>{
                    console.log('pev')
                    socket.emit('prevSlide');
                }
            }
        })
    }).emit('authorize').emit('authenticate', {
        token
    }) //send the jwt 
});