class Player {
    constructor() {
        this.playerData = require("./playerData.js");
    }

    create(_key, _socket, _name, _gameCode) {
        return {
            "key": _key,
            "socket": _socket,
            "gameCode": _gameCode,
            "playerData": this.playerData.create(_name)
        };
    }
}

module.exports = new Player();