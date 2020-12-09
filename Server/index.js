const socketHandeler = require('./socketHandeler.js');
socketHandeler.create(15000);

socketHandeler.getGameFromKey("TEST");
console.log(socketHandeler);