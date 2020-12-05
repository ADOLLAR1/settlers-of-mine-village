class Road {
    constructor(_playerdata, _x, _y, _direction) {
        this.playerdata = _playerdata; //CLASS:PlayerData
        this.pos = {x: _x, y: _y}; //{int,int}
        this.direction = _direction; //Bool 0=vertical 1=horizontal
        this.size = 10; //int
        this.tileSize = 100; //int
    }

    realPos() {
        let tmp1x = Math.floor(this.pos.x/2);
        let tmp2x = Math.ceil(this.pos.x/2);
        let tmp3x = (tmp2x * this.tileSize) + (tmp1x * this.size);
        let tmp1y = Math.floor(this.pos.y/2);
        let tmp2y = Math.ceil(this.pos.y/2);
        let tmp3y = (tmp2y * this.tileSize) + (tmp1y * this.size);
        return {x: tmp3x, y: tmp3y};
    }

    draw() {
        stroke(0,0,0,0);
        let tmppos = this.realPos();
        fill(this.playerdata.color);
        if (this.direction) {
            rect(tmppos.x, tmppos.y, this.tileSize, this.size);
        } else {
            rect(tmppos.x, tmppos.y, this.size, this.tileSize);
        }
    }
}