class Game {
    constructor() {

    }

    create(_key) {
        let data = {};
        data.name = "GAME";
        data.players = [];
        data.key = _key;
        data.mapClass = require("./map.js");
        data.turnIndex = 0;
        data.map = data.mapClass.create();

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
                        }
                    ]
                }));
            } else {
                console.log("CANNOT START '" + this.key + "'! INVALID PLAYER AMOUNT!");
                return; //PLAYER COUNT INVALID
            }
        }

        data.place = function(_object) {
            //CREATE THIS
        }

        return data;
    }
}

module.exports = new Game();