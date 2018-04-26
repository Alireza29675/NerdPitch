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

            this.changeStatus(1); //connected

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

        this.socket.on('disconnect', () => {
            this.changeStatus(0); // disconnect
        })

    }

    changeStatus(status) {
        if (status) {
            // let's show synced
            $('.socketConnection span').style.transitionDelay = '0.2s'
            $('.socketConnection span').style.transform = 'scale(1)';
            $('.socketConnection').style.transform = 'translateX(0px)';
            setTimeout(() => {
                // let's hide
                $('.socketConnection span').style.transitionDelay = '0s'
                $('.socketConnection').style.transitionDelay = '0.2s'
                $('.socketConnection span').style.transform = 'scale(0)';
                $('.socketConnection').style.transform = 'translateX(-100%)';
            }, 1500)

            // let's make the marker green

            $('.socketConnectionMarker>i').style.backgroundColor = '#27ae60';

            // let's change the text

            $('.socketConnectionTextSliderCont').style.transform = 'translateY(0px)';

        } else {

            // let's make the marker red

            $('.socketConnectionMarker>i').style.backgroundColor = '#c0392b';

            // let's change the text

            $('.socketConnectionTextSliderCont').style.transform = 'translateY(-30px)';

        }
    }

}

new Presentation();