const io = require('socket.io-client');

class Control {
    constructor() {

        this.token = window.token;

        this.presentationUrl = window.presentationUrl;

        this.socket = io.connect('/');

        this.initSocket();

    }

    initSocket() {

        this.socket.on('connect', () => {
            
            this.changeStatus(1);// connect

            this.socket.on('authenticated',  ()=> {
                //do other things 
                this.socket.emit('connectToPresentationAsAdmin', presentationUrl, (response) => {
                    if (response) {
                        // some code
                        $(".nextSlideBtn").onclick = () => {
                            console.log('next')
                            this.socket.emit('nextSlide');
                        }
                        $(".prevSlideBtn").onclick = () => {
                            console.log('pev')
                            this.socket.emit('prevSlide');
                        }
                    }
                })
            }).emit('authorize').emit('authenticate', {
                token
            }) //send the jwt 
        });

        this.socket.on('disconnect', () => {
            this.changeStatus(0);
        })
    }

    changeStatus(status){

        if(status){
            $('.statusSlideCont').style.transform = 'translateY(0px)';
            $('.controlButtons').style.filter = 'blur(0px)';
        }else{
            $('.statusSlideCont').style.transform = 'translateY(-50px)';
            $('.controlButtons').style.filter = 'blur(10px)';
        }

    }

}

new Control();