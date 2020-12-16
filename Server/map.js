class Map {
    constructor() {

    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 != currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

    posKey(_x, _y) {
        return (_x + "-" + _y);
    }

    create() {
        let data = {};
        data.name = "MAP";
        data.map = {};
        data.numbers = this.shuffle([
            2,2,2,2,2,2,
            3,3,3,3,3,3,
            4,4,4,4,4,4,
            5,5,5,5,5,5,5,
            6,6,6,6,6,6,6,
            8,8,8,8,8,8,8,
            9,9,9,9,9,9,9,
            10,10,10,10,10,10,
            11,11,11,11,11,11,
            12,12,12,12,12,12
        ]);
        data.templateClass = require('./mapTemplate.js');
        data.template = data.templateClass.pickRandom();
        data.pillagerClass = require("./pillager.js");
        data.pillager = data.pillagerClass.create();
        data.tile = require("./tile.js");
        data.river = require("./river.js");

        data.posKey = function(_x, _y) {
            return (_x + "-" + _y);
        }

        data.collectResources = function(_num) {
            let a;
            let b;
            let c;
            let d;
            let tile;
            for (let i=0; i<15; i++) {
                for (let j=0; j<15; j++) {
                    if (j % 2 == i % 2 && j % 2 == 1) {
                        tile = this.map[this.posKey(j,i)];
                        a = this.map[this.posKey(j-1, i-1)];
                        b = this.map[this.posKey(parseInt(j)+1, parseInt(i)+1)];
                        c = this.map[this.posKey(parseInt(j)+1, i-1)];
                        d = this.map[this.posKey(j-1, parseInt(i)+1)];

                        if (a != undefined && tile != undefined) {
                            if (a.number == _num && a.pos != this.pillager.pos) {
                                if (tile.name === "VILLAGE") {
                                    tile.player.playerData[a.resource]++;
                                } else if (tile.name === "CITY") {
                                    tile.player.playerData[a.resource] += 2;
                                }
                            }
                        }
                        if (b != undefined && tile != undefined) {
                            if (b.number == _num && b.pos != this.pillager.pos) {
                                if (tile.name === "VILLAGE") {
                                    tile.player.playerData[b.resource]++;
                                } else if (tile.name === "CITY") {
                                    tile.player.playerData[b.resource] += 2;
                                }
                            }
                        }
                        if (c != undefined && tile != undefined) {
                            if (c.number == _num && c.pos != this.pillager.pos) {
                                if (tile.name === "VILLAGE") {
                                    tile.player.playerData[c.resource]++;
                                } else if (tile.name === "CITY") {
                                    tile.player.playerData[c.resource] += 2;
                                }
                            }
                        }
                        if (d != undefined && tile != undefined) {
                            if (d.number == _num && d.pos != this.pillager.pos) {
                                if (tile.name === "VILLAGE") {
                                    tile.player.playerData[d.resource]++;
                                } else if (tile.name === "CITY") {
                                    tile.player.playerData[d.resource] += 2;
                                }
                            }
                        }

                    }
                }
            }
        }

        for (let i=0;i<15;i++) {
            for (let j=0;j<15;j++) {
                if (data.template[this.posKey(j,i)] === "O") {
                    data.map[this.posKey(j,i)] = data.tile.create("Ocean", j, i, data.numbers.pop(), "fish");
                }
                
                if (data.template[this.posKey(j,i)] === "R") {
                    data.map[this.posKey(j,i)] = data.river.create(j,i);
                }
                
                if (data.template[this.posKey(j,i)] === "L") {
                    let meta = data.templateClass.types[(Math.floor(Math.random()*data.templateClass.types.length))];
                    data.map[this.posKey(j,i)] = data.tile.create(meta.type, j, i, data.numbers.pop(), meta.res);
                }
                
                if (data.template[this.posKey(j,i)] === "U") {
                    data.map[this.posKey(j,i)] = undefined;
                }

                if (data.template[this.posKey(j,i)] === "G") {
                    data.map[this.posKey(j,i)] = data.tile.create("Badlands", j, i, data.numbers.pop(), "gold");
                }
            }
        }

        return data;
    }
}

module.exports = new Map();