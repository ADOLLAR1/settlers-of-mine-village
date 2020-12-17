const ASSETS = {
    IMAGES: {},
    SOUNDS: {}
}

let tiles = [];
let roads = [];
let villages = [];
let cities = [];

let gui;
let playerdata;
let socketHandeler;
let placeHandeler;
let pillager;

function preload() {
    loadImages();
}

function setup() {
    createCanvas(870,870);
    let tmp = prompt("If you have a client key paste it here. Leave blank if you do not have one!");
    if (tmp == undefined) tmp == "";
    playerdata = new PlayerData(tmp, [0,0,0]);
    gui = new GUI(playerdata);
    socketHandeler = new SocketHandeler("ws://172.16.141.151:15000", playerdata);
    socketHandeler.create();
    placeHandeler = new PlaceHandeler();
    pillager = new Pillager(-2, -2);
}

function draw() {
    gui.update();
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

    for (let i=0; i<villages.length; i++) {
        let v = villages[i];
        if (v != undefined) {
            if (v.city == undefined) {
                v.draw()
            } else {
                cities.push(v.city);
                villages[i] = undefined;
            }
        }
    }

    cities.forEach(c => {
        if (c != undefined) {
            c.draw()
        } 
    });

    pillager.draw();
}

function mousePressed() {
}

function loadImages() {
    ASSETS.IMAGES.DevGrass = loadImage("Assets/devGrass.png");
    ASSETS.IMAGES.Ocean = loadImage("Assets/ocean.png");
    ASSETS.IMAGES.Plain = loadImage("Assets/plains.png");
    ASSETS.IMAGES.Forest = loadImage("Assets/forest.png");
    ASSETS.IMAGES.Mountain = loadImage("Assets/mountain.png");
    ASSETS.IMAGES.Swamp = loadImage("Assets/swamp.png");
    ASSETS.IMAGES.Desert = loadImage("Assets/desert.png");
    ASSETS.IMAGES.Badlands = loadImage("Assets/badlands.png");
    ASSETS.IMAGES.Pillager = loadImage("Assets/pillager.png");
}