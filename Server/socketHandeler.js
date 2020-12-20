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
            if (object.return.Village1.x % 2 == object.return.Village1.y % 2 && object.return.Village1.x % 2 == 1) {
                if (object.return.Road1.x % 2 != object.return.Road1.y % 2) {
                    if (gme.map.map[gme.mapClass.posKey(object.return.Village1.x, object.return.Village1.y)] == undefined && gme.map.map[gme.mapClass.posKey(object.return.Road1.x, object.return.Road1.y)] == undefined && this.posCheck(object.return.Village1.x, object.return.Village1.y, object.return.Road1.x, object.return.Road1.y)) {
                        gme.place(object.return.Village1, plr, true, false);
                        gme.place(object.return.Road1, plr, false, true);
                        return;
                    }
                }
            }
            plr.socket.send(JSON.stringify({
                "type": "VILLAGEONE",
                "return": true,
                "run": [
                    {
                        "type": "MESSAGE",
                        "name": "TURN",
                        "message": "Please place one village!"
                    },
                    {
                        "type": "PLACE",
                        "name": "Village1",
                        "value": "VILLAGE"
                    },
                    {
                        "type": "MESSAGE",
                        "name": "TURN",
                        "message": "Please place one Road!"
                    },
                    {
                        "type": "PLACE",
                        "name": "Road1",
                        "value": "ROAD"
                    }
                ]
            }));
        }

        if (object.type === "VILLAGETWO") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            if (object.return.Village1.x % 2 == object.return.Village1.y % 2 && object.return.Village1.x % 2 == 1) {
                if (object.return.Road1.x % 2 != object.return.Road1.y % 2) {
                    if (gme.map.map[gme.mapClass.posKey(object.return.Village1.x, object.return.Village1.y)] == undefined && gme.map.map[gme.mapClass.posKey(object.return.Road1.x, object.return.Road1.y)] == undefined && this.posCheck(object.return.Village1.x, object.return.Village1.y, object.return.Road1.x, object.return.Road1.y)) {
                        gme.place(object.return.Village1, plr, true, false);
                        gme.place(object.return.Road1, plr, false, null);
                        return;
                    }
                }
            }
            plr.socket.send(JSON.stringify({
                "type": "VILLAGETWO",
                "return": true,
                "run": [
                    {
                        "type": "MESSAGE",
                        "name": "FAIL",
                        "message": "POSITION INVALID!!! Please try again!"
                    },
                    {
                        "type": "MESSAGE",
                        "name": "TURN",
                        "message": "Please place one village!"
                    },
                    {
                        "type": "PLACE",
                        "name": "Village1",
                        "value": "VILLAGE"
                    },
                    {
                        "type": "MESSAGE",
                        "name": "TURN",
                        "message": "Please place one Road!"
                    },
                    {
                        "type": "PLACE",
                        "name": "Road1",
                        "value": "ROAD"
                    }
                ]
            }));
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

        if (object.type === "PLAYPILLAGERCARD") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.playPillagerCard(plr);
        }

        if (object.type === "STARTTRADE") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.startTrade(plr, object.return.data);
        }

        if (object.type === "TRADEREQUEST") {
            if (object.return.tradeaccept.data.toUpperCase() === "Y") {
                let plr = this.getPlayerFromKey(object.key);
                let sender = this.getPlayerFromKey(object.return.tradeaccept.sender);
                let gme = this.getGameFromKey(plr.gameCode);
                gme.acceptTrade(plr, sender);
            }
        }

        if (object.type === "USEGOLD") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.useGold(plr, object.return.purchase);
        }

        if (object.type === "BANKTRADE") {
            let plr = this.getPlayerFromKey(object.key);
            let gme = this.getGameFromKey(plr.gameCode);
            gme.bankTrade(plr, object.return.purchase, object.return.spend);
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

    posCheck(_x1, _y1, _x2, _y2) {
        let found = false;
        parsetInt(_x1);
        parsetInt(_y1);
        parsetInt(_x2);
        parsetInt(_y2);
        if (_x2 == _x1-1 && _y2 == _y1) {
            found = true;
        }
        if (_x2 == _x1+1 && _y2 == _y1) {
            found = true;
        }
        if (_x2 == _x1 && _y2 == _y1-1) {
            found = true;
        }
        if (_x2 == _x1 && _y2 == _y1+1) {
            found = true;
        }
        return found;
    }
}

module.exports = new SocketHandeler();