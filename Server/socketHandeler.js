class SocketHandeler {
    constructor() {
        this.WebSocket = require('ws');
        this.port = 0; //int
        this.games = []; //[Game, Game, ...]
    }

    create(_port) {
        this.port = _port;

        this.server = new this.WebSocket.Server({
            port: this.port
        });
        this.server.on('connection', (socket) => {this.onConnection(socket);});
    }

    onConnection(socket) {
        socket.on('message', (msg) => {this.onMessage(msg);});
    }

    onMessage(message) {
        //CREATE
    }

    getGameFromKey(_key) {
        for (let i=0; i<this.games.length;i++) {
            if (this.games[i].key === _key) {
                return this.games[i];
            }
        }
        return this.createGame(_key);
    }

    createGame(_key) {
        let game = require('./game.js');
        game.create(_key);
        this.games.push(game);
        return game;
    }

}

module.exports = new SocketHandeler();