class PlayerData {
    constructor(_name, _color) {
        this.key = 0; //int
        this.name = _name; //String
        this.color = _color; //[int,int,int] 0-255
        this.cow = 0; //int
        this.wood = 0 //int
        this.ore = 0; //int
        this.fish = 0; //int
        this.clay = 0; //int
        this.glass = 0; //int
        this.gold = 0; //int
        this.road = 25; //int
        this.village = 5; //int
        this.city = 5; //int
        this.purchasedRoad = 0; //int
        this.purchasedVillage = 0; //int
        this.purchasedCity = 0; //int
        this.victoryPoints = 0; //int
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

    updateAll(_in) {
        this.key = _in.key;
        this.name = _in.name;
        this.color = _in.color;
        this.cow = _in.cow;
        this.wood = _in.wood;
        this.ore = _in.ore;
        this.fish = _in.fish;
        this.clay = _in.clay;
        this.glass = _in.glass;
        this.road = _in.road;
        this.village = _in.village;
        this.city = _in.city;
        this.purchasedRoad = _in.purchasedRoad;
        this.purchasedVillage = _in.purchasedVillage;
        this.purchasedCity = _in.purchasedCity;
        this.victoryPoints = _in.victoryPoints;
    }    
}