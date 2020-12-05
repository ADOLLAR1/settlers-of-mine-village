const ASSETS = {
    IMAGES: {},
    SOUNDS: {}
}

const tiles = [];
const roads = [];
const villages = [];
const cities = [];

let gui;

function preload() {
    loadImages();
}

function setup() {
    createCanvas(870,870);
    gui = new GUI(undefined);
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
        if (t != undefined) {
            t.draw()
        } 
    });
    roads.forEach(r => {
        if (r != undefined) {
            r.draw()
        } 
    });
    villages.forEach(v => {
        if (v != undefined) {
            if (v.city == undefined) {
                v.draw()
            } else {
                cities.push(v.city);
                v = undefined;
            }
        } 
    });
    cities.forEach(c => {
        if (c != undefined) {
            c.draw()
        } 
    });
}

function mousePressed() {
}

function loadImages() {
    ASSETS.IMAGES.DevGrass = loadImage("Assets/DevGrass.png");
}