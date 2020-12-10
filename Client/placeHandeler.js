class PlaceHandeler {
    constructor() {

    }

    promptPlace(_type) {
        let x = 0, y = 0;
        if (_type === "VILLAGE" || _type === "CITY") {
            while (x === "" || x == undefined || parseInt(x) == Number.NaN || parseInt(x) % 2 == 0) {
                x = prompt("Please enter a x coordinate for the building!");
            }
            while (y === "" || y == undefined || parseInt(y) == Number.NaN || parseInt(y) % 2 == 0) {
                y = prompt("Please enter a y coordinate for the building!");
            }
        } else {
            while ((parseInt(x) % 2 == 0 && parseInt(y) % 2 == 0) || (parseInt(x) % 2 == 1 && parseInt(y) % 2 == 1)) {
                while (x === "" || x == undefined || parseInt(x) == Number.NaN) {
                    x = prompt("Please enter a x coordinate for the road!");
                }
                while (y === "" || y == undefined || parseInt(y) == Number.NaN) {
                    y = prompt("Please enter a y coordinate for the road!");
                }
            }
        }
        return {
            "type": _type,
            "x": x,
            "y": y
        };
    }
}