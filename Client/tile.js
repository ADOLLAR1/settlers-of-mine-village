class Tile {
    constructor(_type, _x, _y, _number) {
        this.type = _type; //string
        this.pos = {x: _x, y: _y}; //{int,int}
        this.size = 100 //int
        this.roadSize = 10; //int
        this.number = _number; //int
    }

    realPos() {
        let tmp1x = Math.floor(this.pos.x/2);
        let tmp2x = Math.ceil(this.pos.x/2);
        let tmp3x = (tmp2x * this.size) + (tmp1x * this.roadSize);
        let tmp1y = Math.floor(this.pos.y/2);
        let tmp2y = Math.ceil(this.pos.y/2);
        let tmp3y = (tmp2y * this.size) + (tmp1y * this.roadSize);
        return {x: tmp3x, y: tmp3y};
    }

    draw() {
        let tmppos = this.realPos();
        stroke(0,0,0,0);
        image(ASSETS.IMAGES[this.type], tmppos.x, tmppos.y, this.size, this.size);
        textAlign(RIGHT, TOP);
        textSize(12);
        text("("+this.pos.x+","+this.pos.y+")", tmppos.x, tmppos.y, this.size, this.size);
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.number.toString(), tmppos.x, tmppos.y, this.size, this.size);
    }

}