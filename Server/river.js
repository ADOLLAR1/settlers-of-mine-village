class River {
    constructor() {
    }

    create(_x, _y) {
        let data = {};
        data.name = "RIVER"
        data.pos = {x:_x,y:_y};
        return data;
    }
}

module.exports = new River();