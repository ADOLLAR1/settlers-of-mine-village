class PlayerData {
    constructor() {

    }

    create(_name, _color, _key) {
        return {
            "name": _name,
            "cow": 10,
            "wood": 10,
            "ore": 10,
            "fish": 10,
            "clay": 10,
            "glass": 10,
            "road": 23,
            "village": 5,
            "city": 5,
            "purchasedRoad": 2,
            "purchasedVillage": 0,
            "purchasedCity": 0,
            "cards": [],
            "color": _color,
            "victoryPoints": 0,
            "key": _key
        };
    }
}

module.exports = new PlayerData();