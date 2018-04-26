const io = require('socket.io-client');

const token = window.token;

const presentationUrl = window.presentationUrl;

const impressApi = window.impress;

const socket = io.connect('/');

socket.on('connect', () => {

    socket.emit('connectToPresentation', presentationUrl, (response) => {
        if (response) {
            socket.on('nextSlide', () => {
                document.dispatchEvent(new Event('nerdPitch:nextSlide'))
                impressApi.next();
                console.log('Next Slide');
            })
            socket.on('prevSlide', () => {
                document.dispatchEvent(new Event('nerdPitch:prevSlide'))
                impressApi.prev();
                console.log('Prev Slide')
            })
        }
    });

});