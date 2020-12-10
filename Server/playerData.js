class PlayerData {
    constructor() {

    }

    create(_name) {
        return {
            "name": _name,
            "cow": 0,
            "wood": 0,
            "ore": 0,
            "fish": 0,
            "clay": 0,
            "glass": 0,
            "road": 25,
            "village": 5,
            "city": 5,
            "purchasedRoad": 0,
            "purchasedVillage": 0,
            "purchasedCity": 0,
            "cards": []
        };
    }
}

module.exports = new PlayerData();