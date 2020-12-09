class Game {
    constructor() {

    }

    create(_key) {
        let data = {};
        data.name = "GAME";
        data.players = [];
        data.key = _key;
        data.mapClass = require("./map.js");
        data.map = data.mapClass.create();
        return data;
    }
}

module.exports = new Game();