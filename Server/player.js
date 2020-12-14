class Player {
    constructor() {
        this.playerData = require("./playerData.js");
    }

    create(_key, _socket, _name, _gameCode, _color) {
        return {
            "key": _key,
            "socket": _socket,
            "gameCode": _gameCode,
            "playerData": this.playerData.create(_name, _color)
        };
    }
}

module.exports = new Player();