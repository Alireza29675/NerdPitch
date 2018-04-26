const io = require('socket.io-client');

class Presentation {
    
    constructor() {

        this.presentationUrl = window.presentationUrl;

        this.impressApi = window.impress;

        this.socket = io.connect('/');

        this.initSocket();

    }

    initSocket() {
        this.socket.on('connect', () => {

            this.socket.emit('connectToPresentation', this.presentationUrl, (response) => {
                if (response) {
                    this.socket.on('nextSlide', () => {
                        document.dispatchEvent(new Event('nerdPitch:nextSlide'))
                        this.impressApi.next();
                        console.log('Next Slide');
                    })
                    this.socket.on('prevSlide', () => {
                        document.dispatchEvent(new Event('nerdPitch:prevSlide'))
                        this.impressApi.prev();
                        console.log('Prev Slide')
                    })
                }
            });

        });
    }

}

new Presentation();