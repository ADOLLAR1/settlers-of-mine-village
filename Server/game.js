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
            if (this.players[this.turnIndex] != _player) {
                //QOL
                return;
            }
            if (_object.type === "ROAD") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined && !(_object.x % 2 == _object.y % 2)) {
                    if (_flag == false && this.checkNeighboursRoad(_object.x, _object.y, _player) && _player.playerData.purchasedRoad >= 1) {
                        _player.playerData.purchasedRoad--;
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
                    } else if (_flag == true && _player.playerData.road >= 1) {
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
                    } else if (_flag2 == true) {
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
                    } else if (_flag2 == null) {
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
                } else if (_flag2 == true) {
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
                } else if (_flag == null) {
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
            if (_object.type === "VILLAGE") {
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)] == undefined && (_object.x % 2 == _object.y % 2) && _object.x % 2 == 1) {
                    if (_flag == false && this.checkNeighbours(_object.x, _object.y, _player) && _player.playerData.purchasedVillage >= 1) {
                        _player.playerData.purchasedVillage--;
                        _player.playerData.victoryPoints++;
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
                    } else if (_flag == true && _player.playerData.village >= 1) {
                        _player.playerData.village--;
                        _player.playerData.victoryPoints++;
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
                if (this.map.map[this.mapClass.posKey(_object.x, _object.y)].player == _player && this.map.map[this.mapClass.posKey(_object.x, _object.y)].name === "VILLAGE" && (_object.x % 2 == _object.y % 2) && _object.x % 2 == 1  && _player.playerData.purchasedCity >= 1) {
                    this.map.map[this.mapClass.posKey(_object.x, _object.y)] = this.cityClass.create(_object.x, _object.y, _player);
                    _player.playerData.purchasedCity--;
                    _player.playerData.village++;
                    _player.playerData.victoryPoints++;
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
            _x = parseInt(_x);
            _y = parseInt(_y);
            let a = this.map.map[this.mapClass.posKey(_x-1, _y)];
            let b = this.map.map[this.mapClass.posKey(_x+1, _y)];
            let c = this.map.map[this.mapClass.posKey(_x, _y-1)];
            let d = this.map.map[this.mapClass.posKey(_x, _y+1)];
            if (a != undefined) {
                if (a.player == _player && (a.name === "VILLAGE" || a.name === "CITY")) {
                    found = true;
                }
            }
            if (b != undefined) {
                if (b.player == _player && (b.name === "VILLAGE" || b.name === "CITY")) {
                    found = true;
                }
            }
            if (c != undefined) {
                if (c.player == _player && (c.name === "VILLAGE" || c.name === "CITY")) {
                    found = true;
                }
            }
            if (d != undefined) {
                if (d.player == _player && (d.name === "VILLAGE" || d.name === "CITY")) {
                    found = true;
                }
            }

            if (_x % 2 == 0) {
                let a = [this.map.map[this.mapClass.posKey(_x-1, _y-1)],
                this.map.map[this.mapClass.posKey(_x-2, _y  )],
                this.map.map[this.mapClass.posKey(_x-1, _y+1)],
                this.map.map[this.mapClass.posKey(_x+1, _y-1)],
                this.map.map[this.mapClass.posKey(_x+2, _y  )],
                this.map.map[this.mapClass.posKey(_x+1, _y+1)]]

                a.forEach(ab => {
                    if (ab != undefined) {
                        if (ab.player == _player && ab.name === "ROAD") {
                            found = true;
                        }
                    }
                });
            } else {
                let a = [this.map.map[this.mapClass.posKey(_x-1, _y-1)],
                this.map.map[this.mapClass.posKey(_x  , _y-2)],
                this.map.map[this.mapClass.posKey(_x-1, _y+1)],
                this.map.map[this.mapClass.posKey(_x+1, _y-1)],
                this.map.map[this.mapClass.posKey(_x  , _y+2)],
                this.map.map[this.mapClass.posKey(_x+1, _y+1)]]

                a.forEach(ab => {
                    if (ab != undefined) {
                        if (ab.player == _player && ab.name === "ROAD") {
                            found = true;
                        }
                    }
                });
            }
            return found;
        }

        data.rollDice = function() {

            for (let i=0; i<this.players.length; i++) {
                if (this.players[i].playerData.victoryPoints >= 10) {
                    this.turnIndex = -1;
                    for (let j=0; j<this.players.length; j++) {
                        this.players[j].socket.send(JSON.stringify({
                            "type": "WINALERT",
                            "return": false,
                            "run": [
                                {
                                    "type": "MESSAGE",
                                    "name": "WINALERT",
                                    "message": this.players[i].playerData.name + " has won the game!"
                                }
                            ]
                        }));
                    }
                    break;
                }
            }

            this.turnIndex++;
            if (this.turnIndex == this.players.length) this.turnIndex = 0;
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
            this.tellDice(num);
            if (num != 7) {
                this.map.collectResources(num);
                this.updatePlayerdata();
            } else {
                this.handlePillager()
            }
        }

        data.handlePillager = function() {
            let plr;
            let plrdata;
            let total;
            let toRemove = 0;
            let res = "cow";
            for (let i=0; i<this.players.length; i++) {
                plr = this.players[i];
                plrdata = plr.playerData;
                total = plrdata.cow + plrdata.wood + plrdata.ore + plrdata.fish + plrdata.clay + plrdata.glass;
                if (total >= 7) {
                    toRemove = Math.ceil(total/2);
                } else {toRemove = 0}
                if (toRemove > 0) {
                    for (let j=0; j<toRemove; j++) {
                        res = "cow";
                        if (plrdata.wood > plrdata[res]) {res = "wood";}
                        if (plrdata.ore > plrdata[res]) {res = "ore";}
                        if (plrdata.fish > plrdata[res]) {res = "fish";}
                        if (plrdata.clay > plrdata[res]) {res = "clay";}
                        if (plrdata.glass > plrdata[res]) {res = "glass";}
                        plrdata[res]--;
                    }

                    plr.socket.send(JSON.stringify({
                        "type": "PILLAGED",
                        "return": false,
                        "run": [
                            {
                                "type": "MESSAGE",
                                "name": "PILLAGED",
                                "message": "Pillaged! " + toRemove + " resources were pillaged."
                            }
                        ]
                    }));
                }
            }

            this.players[this.turnIndex].socket.send(JSON.stringify({
                "type": "PLACEPILLAGER",
                "return": true,
                "run": [
                    {
                        "type": "PLACEPILLAGER",
                        "name": "data"
                    }
                ]
            }));
        }

        data.placePillager = function(_player, _data) {
            let pos = {x: _data.x, y: _data.y};
            if (_player == this.players[this.turnIndex]) {
                this.map.pillager.pos = pos;
                this.updatePillager();
            }
        }

        data.updatePillager = function() {
            for (let i=0; i<this.players.length; i++) {
                this.players[i].socket.send(JSON.stringify({
                    "type": "PILLAGER",
                    "return": false,
                    "run": [
                        {
                            "type": "PILLAGER",
                            "name": "PILLAGER",
                            "value": this.map.pillager.pos
                        }
                    ]
                }));
            }
        }

        data.updatePlayerdata = function() {
            for (let i=0; i<this.players.length; i++) {
                this.players[i].socket.send(JSON.stringify({
                    "type": "PLAYERDATA",
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

        data.tellDice = function(_num) {
            for (let i=0; i<this.players.length; i++) {
                this.players[i].socket.send(JSON.stringify({
                    "type": "ROLL",
                    "return": false,
                    "run": [
                        {
                            "type": "MESSAGE",
                            "name": "DICE",
                            "message": "A " + _num + " was rolled!",
                            "num": _num
                        }
                    ]
                }));
            }
        }

        data.endTurn = function(_player) {
            if (this.players[this.turnIndex] == _player) {
                this.rollDice();
            } else {
                //QOL
            }
        }

        data.purchase = function(_type, _player) {
            if (this.players[this.turnIndex] != _player) {
                //QOL
                return;
            }
            if (_type === "ROAD") {
                if (_player.playerData.clay >= 1 && _player.playerData.wood >= 1 && _player.playerData.road >= 1) {
                    _player.playerData.clay--;
                    _player.playerData.wood--;
                    _player.playerData.road--;
                    _player.playerData.purchasedRoad++;
                }
            } else if (_type === "VILLAGE") {
                if (_player.playerData.cow >= 1 && _player.playerData.wood >= 1 && _player.playerData.fish >= 1 && _player.playerData.glass >= 1 && _player.playerData.village >= 1) {
                    _player.playerData.cow--;
                    _player.playerData.wood--;
                    _player.playerData.fish--;
                    _player.playerData.glass--;
                    _player.playerData.village--;
                    _player.playerData.purchasedVillage++;
                }
            } else if (_type === "CITY") {
                if (_player.playerData.clay >= 2 && _player.playerData.ore >= 2 && _player.playerData.city >= 1) {
                    _player.playerData.clay -= 2;
                    _player.playerData.ore -= 2;
                    _player.playerData.city--;
                    _player.playerData.purchasedCity++;
                }
            } else if (_type === "CARD") {
                if (_player.playerData.ore >= 1 && _player.playerData.cow >= 1 && _player.playerData.glass >= 1) {
                    _player.playerData.ore--;
                    _player.playerData.cow--;
                    _player.playerData.glass--;
                    let random = Math.random();
                    if (random >= 0.66) {
                        _player.playerData.pillageCard++;
                        _player.socket.send(JSON.stringify({
                            "type": "PURCHASE",
                            "return": false,
                            "run": [
                                {
                                    "type": "MESSAGE",
                                    "name": "PILLAGECARD",
                                    "message": "You recived a Pillager Card"
                                }
                            ]
                        }));
                    } else if (random >= 0.33) {
                        let tmp = ["cow", "wood", "ore", "fish", "clay", "glass"];

                        tmp.forEach(r => {
                            _player.playerData[r] += Math.floor(Math.random()*2)+1;
                        });
                        _player.socket.send(JSON.stringify({
                            "type": "PURCHASE",
                            "return": false,
                            "run": [
                                {
                                    "type": "MESSAGE",
                                    "name": "LOOTCARD",
                                    "message": "You recived a Loot Card"
                                },
                                {
                                    "type": "PLAYERDATA",
                                    "name": "PLAYERDATA",
                                    "value": _player.playerData
                                }
                            ]
                        }));
                    } else {
                        _player.playerData.victoryPoints++;
                        _player.socket.send(JSON.stringify({
                            "type": "PURCHASE",
                            "return": false,
                            "run": [
                                {
                                    "type": "MESSAGE",
                                    "name": "LOOTCARD",
                                    "message": "You recived a Victroy Point Card"
                                }
                            ]
                        }));
                    }
                }
            }
    
            _player.socket.send(JSON.stringify({
                "type": "PURCHASE",
                "return": false,
                "run": [
                    {
                        "type": "PLAYERDATA",
                        "name": "PLAYERDATA",
                        "value": _player.playerData
                    }
                ]
            }));
        }

        data.playPillagerCard = function(_player) {
            if (_player == this.players[this.turnIndex] && _player.playerData.pillageCards >= 1) {
                _player.playerData.pillageCards--;
                _player.socket.send(JSON.stringify({
                    "type": "PLACEPILLAGER",
                    "return": true,
                    "run": [
                        {
                            "type": "PLACEPILLAGER",
                            "name": "data"
                        }
                    ]
                }));
            }
        }

        data.startTrade = function(_player, _data) {
            let plrdata;
            plrdata = _player.playerData;
            if (plrdata.cow < _data.givecow || plrdata.wood < _data.givewood || plrdata.ore < _data.giveore || plrdata.fish < _data.givefish || plrdata.clay < _data.giveclay || plrdata.glass < _data.giveglass || plrdata.tradeActive) {
                //QOL
                return;
            }
            plrdata.tradeActive = true; 
            plrdata.tradeData = _data;

            let cow = _data.takecow;
            let wood = _data.takewood;
            let ore = _data.takeore;
            let fish = _data.takefish;
            let clay = _data.takeclay;
            let glass = _data.takeclay;

            let tmpPlayers = [];

            

            for (let i=0; i<this.players.length; i++) {
                if (this.players[i] != _player) {
                    plrdata = this.players[i].playerData;
                    if (plrdata.cow >= cow && plrdata.wood >= wood && plrdata.ore >= ore && plrdata.fish >= fish && plrdata.clay >= clay && plrdata.glass >= glass) {
                        tmpPlayers.push(this.players[i])
                    }
                }
            }

            _player.socket.send(JSON.stringify({
                "type": "TRADESTARTMESSAGE",
                "return": false,
                "run": [
                    {
                        "type": "MESSAGE",
                        "name": "TRADESTARTMESSAGE",
                        "message": "Trade request sent to " + tmpPlayers.length + " player(s)!"
                    }
                ]
            }));

            for (let i=0; i<tmpPlayers.length; i++) {
                tmpPlayers[i].socket.send(JSON.stringify({
                    "type": "TRADEREQUEST",
                    "return": true,
                    "run": [
                        {
                            "type": "MESSAGE",
                            "name": "TRADEREQUESTHEADER",
                            "message": _player.playerData.name + " has sent a trade request!" 
                        },
                        {
                            "type": "MESSAGE",
                            "name": "TRADEREQUESTINFO",
                            "message": "You give: " + cow + " cow " + wood + " wood " + ore + " ore " + fish + " fish " + clay + " clay " + glass + " glass\nYou recive: " + _data.givecow + " cow " + _data.givewood + " wood " + _data.giveore + " ore " + _data.givefish + " fish " + _data.giveclay + " clay " + _data.giveglass + " glass"
                        },
                        {
                            "type": "TRADEACCEPT",
                            "name": "tradeaccept",
                            "sender": _player.key
                        }
                    ]
                }));
            }
        }

        data.acceptTrade = function(_player, _sender) {
            if (_sender.playerData.tradeActive) {
                _sender.playerData.tradeActive = false;

                let data = _sender.playerData.tradeData;
                let send = _sender.playerData;
                let plr = _player.playerData;

                send.cow -= data.givecow;
                send.wood -= data.givewood;
                send.ore -= data.giveore;
                send.fish -= data.givefish;
                send.clay -= data.giveclay;
                send.glass -= data.giveglass;
                plr.cow -= data.takecow;
                plr.wood -= data.takewood;
                plr.ore -= data.takeore;
                plr.fish -= data.takefish;
                plr.clay -= data.takeclay;
                plr.glass -= data.takeglass;

                send.cow += data.takecow;
                send.wood += data.takewood;
                send.ore += data.takeore;
                send.fish += data.takefish;
                send.clay += data.takeclay;
                send.glass += data.takeglass;
                plr.cow += data.givecow;
                plr.wood += data.givewood;
                plr.ore += data.giveore;
                plr.fish += data.givefish;
                plr.clay += data.giveclay;
                plr.glass += data.giveglass;

                this.updatePlayerdata();

                _sender.socket.send(JSON.stringify({
                    "type": "ACCEPTTRADEMESSAGE",
                    "return": false,
                    "run": [
                        {
                            "type": "MESSAGE",
                            "name": "ACCEPTTRADEMESSAGE",
                            "message": "Trade accepted!"
                        }
                    ]
                }));
                _player.socket.send(JSON.stringify({
                    "type": "ACCEPTTRADEMESSAGE",
                    "return": false,
                    "run": [
                        {
                            "type": "MESSAGE",
                            "name": "ACCEPTTRADEMESSAGE",
                            "message": "Trade accepted!"
                        }
                    ]
                }));
            }
        }
        
        data.useGold = function(_player, _type) {
            if (_player != this.players[this.turnIndex]) {
                //QOL
                return;
            }
            if (_player.playerData.gold >= 1) {
                if (_type == "cow" || _type == "wood" || _type == "ore" || _type == "fish" || _type == "clay" || _type == "glass") {
                    _player.playerData.gold--;
                    _player.playerData[_type]++;
                    _player.socket.send(JSON.stringify({
                        "type": "PLAYERDATA",
                        "return": false,
                        "run": [
                            {
                                "type": "PLAYERDATA",
                                "name": "PLAYERDATA",
                                "value": _player.playerData
                            }
                        ]
                    }));
                }
            }
        }

        data.bankTrade = function(_player, _type, _type2) {
            if (_player != this.players[this.turnIndex]) {
                //QOL
                return;
            }
            if ((_type == "cow" || _type == "wood" || _type == "ore" || _type == "fish" || _type == "clay" || _type == "glass") && (_type2 == "cow" || _type2 == "wood" || _type2 == "ore" || _type2 == "fish" || _type2 == "clay" || _type2 == "glass")) {
                if (_player.playerData[_type2] >= 4) {
                    _player.playerData[_type2] -= 4;
                    _player.playerData[_type]++;
                    _player.socket.send(JSON.stringify({
                        "type": "PLAYERDATA",
                        "return": false,
                        "run": [
                            {
                                "type": "PLAYERDATA",
                                "name": "PLAYERDATA",
                                "value": _player.playerData
                            }
                        ]
                    }));
                }
            }
        }

        return data;
    }
}

module.exports = new Game();