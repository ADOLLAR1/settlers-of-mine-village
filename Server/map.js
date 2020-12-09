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
            2,2,2,
            3,3,3,
            4,4,4,
            5,5,5,5,
            6,6,6,6,
            8,8,8,8,
            9,9,9,9,
            10,10,10,
            11,11,11,
            12,12,12
        ]);
        data.templateClass = require('./mapTemplate.js');
        data.template = data.templateClass.pickRandom();
        data.tile = require("./tile.js");
        data.river = require("./river.js");
        for (let i=0;i<15;i++) {
            for (let j=0;j<15;j++) {
                if (data.template[this.posKey(j,i)] === "O") {
                    data.map[this.posKey(j,i)] = data.tile.create("Ocean", j, i, data.numbers.pop(), "Fish");
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
            }
        }
        return data;
    }

    place(_map, _playerData, _type, _x, _y) {
        //PLACE A STRUCTURE
    }
}

module.exports = new Map();