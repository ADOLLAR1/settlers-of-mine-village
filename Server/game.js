class Game {
    constructor() {

    }

    create(_key) {
        let data = {};
        data.name = "GAME";
        data.players = [];
        data.key = _key;
        data.mapClass = require("./map.js");
        data.roadClass = require("./road.js");
        data.villageClass = require("./village.js");
        data.cityClass = require("./city.js");
        data.turnIndex = 0;
        data.map = data.mapClass.create();

        data.colors = [[255,255,255],[255,255,0],[0,255,255],[127,0,255]];

        data.start = function() {
            if (this.players.length >= 3 && this.players.length <= 4) {
                this.turnIndex = 0;
                this.players[this.turnIndex].socket.send(JSON.stringify({
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
            } else {
                console.log("CANNOT START '" + this.key + "'! INVALID PLAYER AMOUNT!");
                return; //PLAYER COUNT INVALID
            }
        }

        data.place = function(_object, _player, _flag, _flag2) {
            if (_object.type === "ROAD") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined && !(_object.x % 2 == _object.y % 2)) {
                    console.log("ROAD1");
                    if (_flag == false && this.checkNeighboursRoad(_object.x, _object.y, _player) && _player.playerdata.purchasedRoad >= 1) {
                        _player.playerData.purchasedRoad--;
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.roadClass.create(_object.x, _object.y, _player);
                        console.log(this.players);
                        for (let i=0; i < this.players.length; i++) {
                            this.players[i].socket.send(JSON.stringify({
                                "type": "BUILD",
                                "return": false,
                                "run": [
                                    {
                                        "type": "BUILD",
                                        "name": "RoadBuild",
                                        "value": {
                                            "type": "ROAD",
                                            "x": _object.x,
                                            "y": _object.y,
                                            "color": _player.playerData.color
                                        }
                                    }
                                ]
                            }));
                        }
                        if (_flag2 == true) {
                            this.turnIndex++;
                            if (this.turnIndex == this.players.length) {
                                this.turnIndex--;
                                this.players[this.turnIndex].socket.send(JSON.stringify({
                                    "type": "VILLAGETWO",
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
                            } else {
                                this.players[this.turnIndex].socket.send(JSON.stringify({
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
                        } else if (_flag2 == null) {
                            this.turnIndex--;
                            if (this.turnIndex < 0) {
                                this.turnIndex = -1;
                                this.rollDice();
                            } else {
                                this.players[this.turnIndex].socket.send(JSON.stringify({
                                    "type": "VILLAGETWO",
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
                        }
                    } else if (_flag == true && _player.playerdata.road >= 1) {
                        _player.playerData.road--;
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.roadClass.create(_object.x, _object.y, _player);
                        for (let i=0; i < this.players.length; i++) {
                            this.players[i].socket.send(JSON.stringify({
                                "type": "BUILD",
                                "return": false,
                                "run": [
                                    {
                                        "type": "BUILD",
                                        "name": "RoadBuild",
                                        "value": {
                                            "type": "ROAD",
                                            "x": _object.x,
                                            "y": _object.y,
                                            "color": _player.playerData.color
                                        }
                                    }
                                ]
                            }));
                        }
                    }
                }
            }
            if (_object.type === "VILLAGE") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined && (_object.x % 2 == _object.y % 2) && _object.x % 2 == 1) {
                    if (_flag == false && this.checkNeighbours(_object.x, _object.y, _player) && _player.playerdata.purchasedVillage >= 1) {
                        _player.playerData.purchasedVillage--;
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.villageClass.create(_object.x, _object.y, _player);
                        for (let i=0; i < this.players.length; i++) {
                            this.players[i].socket.send(JSON.stringify({
                                "type": "BUILD",
                                "return": false,
                                "run": [
                                    {
                                        "type": "BUILD",
                                        "name": "VillageBuild",
                                        "value": {
                                            "type": "VILLAGE",
                                            "x": _object.x,
                                            "y": _object.y,
                                            "color": _player.playerData.color
                                        }
                                    }
                                ]
                            }));
                        }
                    } else if (_flag == true && _player.playerdata.village >= 1) {
                        _player.playerData.village--;
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.villageClass.create(_object.x, _object.y, _player);
                        for (let i=0; i < this.players.length; i++) {
                            this.players[i].socket.send(JSON.stringify({
                                "type": "BUILD",
                                "return": false,
                                "run": [
                                    {
                                        "type": "BUILD",
                                        "name": "VillageBuild",
                                        "value": {
                                            "type": "VILLAGE",
                                            "x": _object.x,
                                            "y": _object.y,
                                            "color": _player.playerData.color
                                        }
                                    }
                                ]
                            }));
                        }
                    }
                }
            }
            if (_object.type === "CITY") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined) return;
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)].player == _player && this.map.map[this.mapClass.posKey(_object.x, _object.y)].name === "VILLAGE" && (_object.x % 2 == _object.y % 2) && _object.x % 2 == 1  && _player.playerdata.purchasedCity >= 1) {
                    this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.cityClass.create(_object.x, _object.y, _player);
                    _player.playerData.purchasedCity--;
                    _player.playerData.village++;
                    for (let i=0; i < this.players.length; i++) {
                        this.players[i].socket.send(JSON.stringify({
                            "type": "BUILD",
                            "return": false,
                            "run": [
                                {
                                    "type": "BUILD",
                                    "name": "CityBuild",
                                    "value": {
                                        "type": "CITY",
                                        "x": _object.x,
                                        "y": _object.y,
                                        "color": _player.playerData.color
                                    }
                                }
                            ]
                        }));
                    }
                }
            }
            this.updatePlayerdata();
        }

        data.checkNeighbours = function(_x, _y, _player) {
            let found = false;
            let a = this.map.map[this.mapClass.posKey(_x-1, _y)];
            let b = this.map.map[this.mapClass.posKey(parseInt(_x)+1, _y)];
            let c = this.map.map[this.mapClass.posKey(_x, _y-1)];
            let d = this.map.map[this.mapClass.posKey(_x, parseInt(_y)+1)];
            if (a != undefined) {
                if (a.player == _player && a.name === "ROAD") {
                    found = true;
                }
            }
            if (b != undefined) {
                if (b.player == _player && b.name === "ROAD") {
                    found = true;
                }
            }
            if (c != undefined) {
                if (c.player == _player && c.name === "ROAD") {
                    found = true;
                }
            }
            if (d != undefined) {
                if (d.player == _player && d.name === "ROAD") {
                    found = true;
                }
            }
            return found;
        }

        data.checkNeighboursRoad = function(_x, _y, _player) {
            let found = false;
            let a = this.map.map[this.mapClass.posKey(_x-1, _y)];
            let b = this.map.map[this.mapClass.posKey(parseInt(_x)+1, _y)];
            let c = this.map.map[this.mapClass.posKey(_x, _y-1)];
            let d = this.map.map[this.mapClass.posKey(_x, parseInt(_y)+1)];
            console.log(this.map.map);
            if (a != undefined) {
                console.log("1");
                if (a.player == _player && (a.name === "VILLAGE" || a.name === "CITY")) {
                    found = true;
                }
            }
            if (b != undefined) {
                console.log("2");
                if (b.player == _player && (b.name === "VILLAGE" || b.name === "CITY")) {
                    found = true;
                }
            }
            if (c != undefined) {
                console.log("3");
                if (c.player == _player && (c.name === "VILLAGE" || c.name === "CITY")) {
                    found = true;
                }
            }
            if (d != undefined) {
                console.log("4");
                if (d.player == _player && (d.name === "VILLAGE" || d.name === "CITY")) {
                    found = true;
                }
            }
            return found;
        }

        data.rollDice = function() {
            this.turnIndex++;
            if (this.turnIndex = this.players.length) this.turnIndex = 0;
            this.players[this.turnIndex].socket.send(JSON.stringify({
                "type": "TURNALERT",
                "return": false,
                "run": [
                    {
                        "type": "MESSAGE",
                        "name": "TURNALERT",
                        "message": "It is now your turn!"
                    }
                ]
            }));
            let a = Math.floor(Math.random()*6)+1;
            let b = Math.floor(Math.random()*6)+1;
            let num = a + b;
            if (num != 7) {
                this.map.collectResources(num,this.players);
                this.updatePlayerdata();
            } else {
                //PILLAGE CODE
            }
        }

        data.updatePlayerdata = function() {
            for (let i=0; i<this.players.length; i++) {
                this.players[i].socket.send(JSON.stringify({
                    "type": "ROLL",
                    "return": false,
                    "run": [
                        {
                            "type": "PLAYERDATA",
                            "name": "PLAYERDATA",
                            "value": this.players[i].playerData
                        }
                    ]
                }));
            }
        }

        return data;
    }
}

module.exports = new Game();