class River {
    constructor(_x, _y, _direction) {
        this.road = new Road(undefined, _x, _y, _direction);
    }

    draw() {
        stroke(0,0,0,0);
        let tmppos = this.road.realPos();
        fill(63,63,255);
        if (this.road.direction == null) {
            rect(tmppos.x, tmppos.y, this.road.size, this.road.size);
            return
        }
        if (this.road.direction) {
            rect(tmppos.x, tmppos.y, this.road.tileSize, this.road.size);
        } else {
            rect(tmppos.x, tmppos.y, this.road.size, this.road.tileSize);
        }
    }
}