class PlayerData {
    constructor(_name, _color) {
        this.name = _name; //String
        this.color = _color; //[int,int,int] 0-255
        this.cow = 0; //int
        this.wood = 0 //int
        this.ore = 0; //int
        this.fish = 0; //int
        this.clay = 0; //int
        this.glass = 0; //int
        this.road = 25; //int
        this.village = 5; //int
        this.city = 5; //int
        this.victorypoints = 0; //int
    }

    add(key, value) {
        this[key] = this[key] + value;
        return undefined;
    }

    set(key, value) {
        this[key] = value;
        return undefined;
    }

    get(key) {
        return this[key];
    }

}