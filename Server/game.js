class Game {
    constructor() {
        this.players = []; //[Player, Player, ...]
        this.key = ""; //string
        this.Map = require("./map.js"); //Map
    }

    create(_key) {
        this.key = _key;
    }

    addPlayer(_player) {
        this.players.push(_player);
    }
}

module.exports = new Game();