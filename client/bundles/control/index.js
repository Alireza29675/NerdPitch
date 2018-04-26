// Socket inititalizations

{
    const io = require('socket.io-client');

    const token = window.token;

    const presentationUrl = window.presentationUrl;

    const socket = io.connect('/');

    socket.on('connect', () => {

        socket.on('authenticated', function () {
            //do other things 
            socket.emit('connectToPresentationAsAdmin', presentationUrl, (response) => {
                if (response) {
                    // some code
                    $(".nextSlideBtn").onclick = () => {
                        console.log('next')
                        socket.emit('nextSlide');
                    }
                    $(".prevSlideBtn").onclick = () => {
                        console.log('pev')
                        socket.emit('prevSlide');
                    }
                }
            })
        }).emit('authorize').emit('authenticate', {
            token
        }) //send the jwt 
    });
}