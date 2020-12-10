class SocketHandeler {
    constructor(_url, _playerData) {
        this.url = _url;
        this.socket = undefined;
        this.playerData = _playerData;
    }

    create() {
        this.socket = new WebSocket(this.url);
        this.socket.addEventListener('open', this.socketOpen);
        this.socket.addEventListener('close', this.socketClose);
        this.socket.addEventListener('error', this.socketError);
        this.socket.addEventListener('message', this.socketMessage);
    }

    socketOpen(event) {

    }

    socketClose(event) {
        socketHandeler.create()
    }

    socketError(event) {
        console.error(event);
    }

    socketMessage(event) {
        let object = JSON.parse(event.data);
        let data = {};
        data.type = object.type;
        data.return = {};
        object.run.forEach(command => {
            if (command.type === "SET") {
                playerdata[command.name] = command.value;
                gui.update();
                data.return[command.name] = command.value;
            } else if (command.type === "MESSAGE") {
                data.return[command.name] = undefined;
                alert(command.message);
            } else if (command.type === "PROMPT") {
                let temp = "";
                while (temp == undefined || temp === "") {
                    temp = prompt(command.message);
                }
                data.return[command.name] = temp;
            } else if (command.type === "MAP") {
                data.return[command.name] = undefined;
                socketHandeler.decodeMap(command.value);

            } else if (command.type === "PLACE") {
                data.return[command.name] = placeHandeler.promptPlace(command.value);
            }
        });
        data.key = playerdata.key;
        if (object.return) {
            this.send(JSON.stringify(data));
        }
    }

    decodeMap(_map) {
        tiles = [];
        roads = [];
        villages = [];
        cities = [];

        for (let i=0;i<15;i++) {
            for (let j=0;j<15;j++) {
                if (_map[socketHandeler.posKey(j,i)] == undefined) {
                    let dir;
                    if (i % 2 == 0) {
                        dir = false;
                    } else if (j % 2 == 0) {
                        dir = true
                    } else {dir = null;}
                    roads.push(new RoadSlot(j, i, dir));
                } else if (_map[socketHandeler.posKey(j,i)].name === "TILE") {
                    tiles.push(new Tile(_map[socketHandeler.posKey(j,i)].type, _map[socketHandeler.posKey(j,i)].pos.x, _map[socketHandeler.posKey(j,i)].pos.y, _map[socketHandeler.posKey(j,i)].number));
                } else if (_map[socketHandeler.posKey(j,i)].name === "RIVER") {
                    let dir;
                    if (i % 2 == 0) {
                        dir = false;
                    } else if (j % 2 == 0) {
                        dir = true
                    } else {dir = null;}
                    roads.push(new River(_map[socketHandeler.posKey(j,i)].pos.x, _map[socketHandeler.posKey(j,i)].pos.y, dir))
                }
                
            }
        }
    }

    posKey(_x, _y) {
        return (_x + "-" + _y);
    }

    startGame() {
        this.socket.send(JSON.stringify({
            "type": "START",
            "key": this.playerData.key,
            "return": {}
        }));
    }
}