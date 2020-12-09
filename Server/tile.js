class Tile {
    constructor() {
    }

    create(_type, _x, _y, _number, _resource) {
        let data = {}
        data.name = "TILE";
        data.type = _type;
        data.pos = {x:_x,y:_y};
        data.number = _number;
        data.resource = _resource;
        return data;
    }
}

module.exports = new Tile();