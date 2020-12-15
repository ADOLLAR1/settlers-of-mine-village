class Pillager {
    constructor(_x, _y) {
        this.pos = {x: _x, y: _y}; //{int,int}
        this.size = 100 //int
        this.roadSize = 10; //int
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
        image(ASSETS.IMAGES["Pillager"], tmppos.x, tmppos.y, this.size, this.size);
    }

}