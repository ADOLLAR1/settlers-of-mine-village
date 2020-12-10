class SocketMessages {
    constructor() {
        this.Check = JSON.stringify({
            "type": "CHECK",
            "return": true,
            "run": [

            ]
        });
    }

    createLoginMessage(_key) {
        return JSON.stringify({
            "type": "JOIN",
            "return": true,
            "run": [
                {
                    "type": "SET",
                    "name": "key",
                    "value": _key
                },
                {
                    "type": "PROMPT",
                    "name": "gameCode",
                    "message": "Please enter a game code. You will be given this."
                },
                {
                    "type": "PROMPT",
                    "name": "name",
                    "message": "Please enter your name."
                }
            ]
        });
    }

    createUpdateMapMessage(_map) {
        return JSON.stringify({
            "type": "MAP",
            "return": false,
            "run": [
                {
                    "type": "MAP",
                    "name": "MAP",
                    "value": _map
                }
            ]
        });
    }
}

module.exports = new SocketMessages();