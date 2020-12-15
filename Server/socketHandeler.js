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
                    if (p.key == object.key) {
                        p.socket = socket;
                    }
                });
            }
        }

        if (object.type === "JOIN") {
            let joinGame = this.getGameFromKey(object.return.gameCode);
            console.log("PLAYER '" + object.return.name + "' (" + object.key + ") ATTEMPTING TO JOIN GAME '" + object.return.gameCode + "'!");
            let newPlayer = this.player.create(object.key, socket, object.return.name, object.return.gameCode, joinGame.colors.pop());
            this.players.push(newPlayer);
            joinGame.players.push(newPlayer);
            newPlayer.socket.send(this.messages.createUpdateMapMessage(joinGame.map.map));
        }

        if (object.type === "START") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            console.log("ATTEMPTING TO START GAME '" + gme.key + "'!");
            gme.start();
        }

        if (object.type === "VILLAGEONE") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.place(object.return.Village1, plr, true, false);
            gme.place(object.return.Road1, plr, false, true);
        }

        if (object.type === "VILLAGETWO") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.place(object.return.Village1, plr, true, false);
            gme.place(object.return.Road1, plr, false, null);
        }

        if (object.type === "PURCHASE") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.purchase(object.return.purchase, plr);
            
        }

        if (object.type === "PLACE") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.place(object.return.place, plr, false, false);
        }

        if (object.type === "ENDTURN") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.endTurn(plr);
        }

        if (object.type === "PLACEPILLAGER") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.placePillager(plr, object.return.data);
        }

        if (object.tye === "PLAYPILLAGERCARD") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.playPillagerCard(plr);
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
        console.log("CREATED GAME '" + _key + "'!");
        return data;
    }

    getPlayerFromKey(_key) {
        for (let i=0;i<this.players.length;i++) {
            if (this.players[i].key == _key) {
                return this.players[i];
            }
        }
        return undefined;
    }
}

module.exports = new SocketHandeler();