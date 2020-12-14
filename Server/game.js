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

        data.colors = [[255,0,0],[255,255,0],[0,255,0],[0,0,255]];

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

        data.place = function(_object, _player, _flag) {
            if (_object.type === "ROAD") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined && !(_object.x % 2 == _object.y % 2)) {
                    console.log("ROAD1");
                    if (_flag == false && this.checkNeighboursRoad(_object.x, _object.y, _player)) {
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.roadClass.create(_object.x, _object.y, _player);
                        console.log("HI THERE1");
                        this.players.forEach(p => {
                            p.socket.send(JSON.stringify({
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
                        });
                    } else if (_flag == true) {
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.roadClass.create(_object.x, _object.y, _player);
                        this.players.forEach(p => {
                            p.socket.send(JSON.stringify({
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
                        });
                    }
                }
            }
            if (_object.type === "VILLAGE") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined && (_object.x % 2 == _object.y % 2) && _object.x % 2 == 1) {
                    if (_flag == false && this.checkNeighbours(_object.x, _object.y, _player)) {
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.villageClass.create(_object.x, _object.y, _player);
                        this.players.forEach(p => {
                            p.socket.send(JSON.stringify({
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
                        });
                    } else if (_flag == true) {
                        this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.villageClass.create(_object.x, _object.y, _player);
                        this.players.forEach(p => {
                            p.socket.send(JSON.stringify({
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
                        });
                    }
                }
            }
            if (_object.type === "CITY") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined) return;
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)].player == _player && this.map.map[this.mapClass.posKey(_object.x, _object.y)].name === "VILLAGE" && (_object.x % 2 == _object.y % 2) && _object.x % 2 == 1) {
                    this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.cityClass.create(_object.x, _object.y, _player);
                    this.players.forEach(p => {
                        p.socket.send(JSON.stringify({
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
                    });
                }
            }
        }

        data.checkNeighbours = function(_x, _y, _player) {
            let found = false;
            if (this.map.map[this.mapClass.posKey(_x-1, _y)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x-1, _y)].player == _player && this.map.map[this.mapClass.posKey(_x-1, _y)].name === "ROAD") {
                    found = true;
                }
            }
            if (this.map.map[this.mapClass.posKey(_x+1, _y)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x+1, _y)].player == _player && this.map.map[this.mapClass.posKey(_x+1, _y)].name === "ROAD") {
                    found = true;
                }
            }
            if (this.map.map[this.mapClass.posKey(_x, _y-1)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x, _y-1)].player == _player && this.map.map[this.mapClass.posKey(_x, _y-1)].name === "ROAD") {
                    found = true;
                }
            }
            if (this.map.map[this.mapClass.posKey(_x, _y+1)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x, _y+1)].player == _player && this.map.map[this.mapClass.posKey(_x, _y+1)].name === "ROAD") {
                    found = true;
                }
            }
            return found;
        }

        data.checkNeighboursRoad = function(_x, _y, _player) {
            let found = false;
            console.log(this.map.map);
            if (this.map.map[this.mapClass.posKey(_x-1, _y)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x-1, _y)].player == _player && (this.map.map[this.mapClass.posKey(_x-1, _y)].name === "VILLAGE" || this.map.map[this.mapClass.posKey(_x-1, _y)].name === "CITY")) {
                    found = true;
                }
            }
            if (this.map.map[this.mapClass.posKey(_x+1, _y)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x+1, _y)].player == _player && (this.map.map[this.mapClass.posKey(_x+1, _y)].name === "VILLAGE" || this.map.map[this.mapClass.posKey(_x+1, _y)].name === "CITY")) {
                    found = true;
                }
            }
            if (this.map.map[this.mapClass.posKey(_x, _y-1)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x, _y-1)].player == _player && (this.map.map[this.mapClass.posKey(_x, _y-1)].name === "VILLAGE" || this.map.map[this.mapClass.posKey(_x, _y-1)].name === "CITY")) {
                    found = true;
                }
            }
            if (this.map.map[this.mapClass.posKey(_x, _y+1)] != undefined) {
                if (this.map.map[this.mapClass.posKey(_x, _y+1)].player == _player && (this.map.map[this.mapClass.posKey(_x, _y+1)].name === "VILLAGE" || this.map.map[this.mapClass.posKey(_x, _y+1)].name === "CITY")) {
                    found = true;
                }
            }
            return found;
        }

        return data;
    }
}

module.exports = new Game();