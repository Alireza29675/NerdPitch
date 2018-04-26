const SocketController = require('../../model/socket');

const socketController = new SocketController(window.token);

socketController.connect();