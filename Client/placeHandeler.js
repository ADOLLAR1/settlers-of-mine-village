class PlaceHandeler {
    constructor() {

    }

    promptPlace(_type) {
        let x = undefined, y = 0;
        if (_type === "VILLAGE" || _type === "CITY") {
            while (x === "" || x == undefined || parseInt(x) == Number.NaN || parseInt(x) % 2 == 0) {
                x = prompt("Please enter a x coordinate for the building!");
            }
            while (y === "" || y == undefined || parseInt(y) == Number.NaN || parseInt(y) % 2 == 0) {
                y = prompt("Please enter a y coordinate for the building!");
            }
        } else if (_type === "ROAD") {
            while (((parseInt(x) % 2 == 0 && parseInt(y) % 2 == 0) || (parseInt(x) % 2 == 1 && parseInt(y) % 2 == 1)) || x == undefined) {
                while (x === "" || x == undefined || parseInt(x) == Number.NaN || x == 0) {
                    x = prompt("Please enter a x coordinate for the road!");
                }
                while (y === "" || y == undefined || parseInt(y) == Number.NaN || y == 0) {
                    y = prompt("Please enter a y coordinate for the road!");
                }
            }
        } else {
            while ((parseInt(x) % 2 != 0 && parseInt(y) % 2 != 0) || x == undefined) {
                while (x === "" || x == undefined || parseInt(x) == Number.NaN || x == 0 || parseInt(x) > 14 || parseInt(x) < 0) {
                    x = prompt("Please enter a x coordinate for the pillager!");
                }
                while (y === "" || y == undefined || parseInt(y) == Number.NaN || y == 0 || parseInt(y) > 14 || parseInt(y) < 0) {
                    y = prompt("Please enter a y coordinate for the pillager!");
                }
            }
        }
        return {
            "type": _type,
            "x": x,
            "y": y
        };
    }

    place(_type, _x, _y, _color) {
        let dir;
        if (_y % 2 == 0) {
            dir = false;
        } else if (_x % 2 == 0) {
            dir = true
        } else {dir = null;}

        if (_type === "ROAD") {
            roads.push(new Road(_color, _x, _y, dir));
        } else if (_type === "VILLAGE") {
            villages.push(new Village(_color, _x, _y));
        } else if (_type === "CITY") {
            cities.push(new City(_color, _x, _y));
        }
    }
}