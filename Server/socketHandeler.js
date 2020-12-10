class SocketHandeler {
    constructor() {
        this.WebSocket = require('ws');
        this.port = 0; //int
        this.game = require("./game.js");
        this.games = []; //[Game, Game, ...]
        this.messages = require("./socketMessages.js");
        this.player = require("./player.js");
        this.players = []; //[PlayerData]
    }

    create(_port) {
        this.port = _port;

        this.server = new this.WebSocket.Server({
            port: this.port
        });
        this.server.on('connection', (socket) => {this.onConnection(socket);});
        console.log("ONLINE!")
    }

    onConnection(socket) {
        console.log("CONNCTION RECIVED!");
        socket.send(this.messages.Check);
        socket.on('message', (msg) => {this.onMessage(msg, socket);});
    }

    onMessage(message, socket) {
        let object = JSON.parse(message);

        if (object.type === "CHECK") {
            if (object.key == 0) {
                socket.send(this.messages.createLoginMessage(Date.now()));
            } else {
                this.players.forEach(p => {
                    if (p.key == objeck.key) {
                        p.socket = socket;
                    }
                });
            }
        }

        if (object.type === "JOIN") {
            console.log("PLAYER '" + object.return.name + "' (" + object.key + ") ATTEMPTING TO JOIN GAME '" + object.return.gameCode + "'");
            let newPlayer = this.player.create(object.key, socket, object.return.name, object.return.gameCode);
            this.players.push(newPlayer);
            let joinGame = this.getGameFromKey(object.return.gameCode);
            joinGame.players.push(newPlayer);
            newPlayer.socket.send(this.messages.createUpdateMapMessage(joinGame.map.map));
        }
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
        let data = this.game.create(_key);
        this.games.push(data);
        console.log("CREATED GAME '" + _key + "'");
        return data;
    }

}

module.exports = new SocketHandeler();