const ASSETS = {
    IMAGES: {},
    SOUNDS: {}
}

const tiles = [];
const roads = [];
const villages = [];
const cities = [];

function preload() {
    loadImages();
}

function setup() {
    createCanvas(870,870);
    for (let i=0;i<16;i+=2) {
        for (let j=0;j<18;j+=2) {
            tiles.push(new Tile("DevGrass", i, j, Math.floor(Math.random()*12+1)));
            roads.push(new RoadSlot(i+1,j,false));
            roads.push(new RoadSlot(i,j+1,true));
            roads.push(new RoadSlot(i+1,j+1,null));
        }
    }
}

function draw() {
    background(127,127,255);
    fill(0,0,0);
    stroke(0,0,0,0);
    tiles.forEach(t => {
        t.draw()
    });
    roads.forEach(r => {
        r.draw()
    });
    villages.forEach(v => {
        v.draw()
    });
    cities.forEach(c => {
        c.draw()
    });
}

function mousePressed() {
    fullscreen(true);
}

function loadImages() {
    ASSETS.IMAGES.DevGrass = loadImage("Assets/DevGrass.png");
}