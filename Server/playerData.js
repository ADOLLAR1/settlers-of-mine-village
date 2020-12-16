class PlayerData {
    constructor() {

    }

    create(_name, _color, _key) {
        return {
            "name": _name,
            "cow": 0,
            "wood": 0,
            "ore": 0,
            "fish": 0,
            "clay": 0,
            "glass": 0,
            "road": 23,
            "village": 5,
            "city": 5,
            "purchasedRoad": 2,
            "purchasedVillage": 0,
            "purchasedCity": 0,
            "color": _color,
            "victoryPoints": 0,
            "key": _key,
            "pillageCards": 0,
            "lootCards": 0,
            "tradeActive": false,
            "tadeData": {}
        };
    }
}

module.exports = new PlayerData();