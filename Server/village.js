class Village {
    constructor() {

    }
    
    create(_x, _y, _player) {
        let data = {};
        data.name = "VILLAGE";
        data.pos = {x: _x, y: _y};
        data.player = _player;
        return data;
    }
}

module.exports = new Village();