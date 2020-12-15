class GUI {
    constructor(_playerdata) {
        this.playerdata = _playerdata; //PlayerData
        this.keyLabel = createElement("span", this.playerdata.key.toString());
        this.vpLabel = createElement("span", this.playerdata.victoryPoints.toString());
        this.cowLabel = createElement("span", this.playerdata.cow.toString());
        this.woodLabel = createElement("span", this.playerdata.wood.toString());
        this.oreLabel = createElement("span", this.playerdata.ore.toString());
        this.fishLabel = createElement("span", this.playerdata.fish.toString());
        this.clayLabel = createElement("span", this.playerdata.clay.toString());
        this.glassLabel = createElement("span", this.playerdata.glass.toString());
        this.roadLabel = createElement("span", this.playerdata.purchasedRoad.toString());
        this.villageLabel = createElement("span", this.playerdata.purchasedVillage.toString());
        this.cityLabel = createElement("span", this.playerdata.purchasedCity.toString());
        this.roadPurchaseButton = createElement("button", "Purchase");
        this.villagePurchaseButton = createElement("button", "Purchase");
        this.cityPurchaseButton = createElement("button", "Purchase");
        this.roadPlaceButton = createElement("button", "Place");
        this.villagePlaceButton = createElement("button", "Place");
        this.cityPlaceButton = createElement("button", "Place");
        this.cardPurchaseButton = createElement("button", "Purchase");
        this.card1PlayButton = createElement("button", "Play Pillage Card");
        this.endTurnButton = createElement("button", "End Turn");

        this.keyLabel.parent("keyLabel");
        this.vpLabel.parent("vpLabel");
        this.cowLabel.parent("cowLabel");
        this.woodLabel.parent("woodLabel");
        this.oreLabel.parent("oreLabel");
        this.fishLabel.parent("fishLabel");
        this.clayLabel.parent("clayLabel");
        this.glassLabel.parent("glassLabel");
        this.roadLabel.parent("roadLabel");
        this.villageLabel.parent("villageLabel");
        this.cityLabel.parent("cityLabel");
        this.roadPurchaseButton.parent("roadPurchase");
        this.villagePurchaseButton.parent("villagePurchase");
        this.cityPurchaseButton.parent("cityPurchase");
        this.roadPlaceButton.parent("roadPlace");
        this.villagePlaceButton.parent("villagePlace");
        this.cityPlaceButton.parent("cityPlace");
        this.cardPurchaseButton.parent("cardPurchase");
        this.card1PlayButton.parent("card1Play");
        this.endTurnButton.parent("end");

        this.roadPurchaseButton.mouseClicked(() => {this.roadPurchaseClick()});
        this.villagePurchaseButton.mouseClicked(() => {this.villagePurchaseClick()});
        this.cityPurchaseButton.mouseClicked(() => {this.cityPurchaseClick()});
        this.roadPlaceButton.mouseClicked(() => {this.roadPlaceClick()});
        this.villagePlaceButton.mouseClicked(() => {this.villagePlaceClick()});
        this.cityPlaceButton.mouseClicked(() => {this.cityPlaceClick()});
        this.cardPurchaseButton.mouseClicked(() => {this.cardPurchaseClick()});
        this.card1PlayButton.mouseClicked(() => {this.card1PlayClick()});
        this.endTurnButton.mouseClicked(() => {this.endTurnClick()});
    }

    update() {
        this.keyLabel.html(this.playerdata.key.toString());
        this.vpLabel.html(this.playerdata.victoryPoints.toString());
        this.cowLabel.html(this.playerdata.cow.toString());
        this.woodLabel.html(this.playerdata.wood.toString());
        this.oreLabel.html(this.playerdata.ore.toString());
        this.fishLabel.html(this.playerdata.fish.toString());
        this.clayLabel.html(this.playerdata.clay.toString());
        this.glassLabel.html(this.playerdata.glass.toString());
        this.roadLabel.html(this.playerdata.purchasedRoad.toString());
        this.villageLabel.html(this.playerdata.purchasedVillage.toString());
        this.cityLabel.html(this.playerdata.purchasedCity.toString());
    }

    roadPurchaseClick() {
        socketHandeler.purchase("ROAD");
    }

    villagePurchaseClick() {
        socketHandeler.purchase("VILLAGE");
    }

    cityPurchaseClick() {
        socketHandeler.purchase("CITY");
    }

    roadPlaceClick() {
        socketHandeler.attemptPlace("ROAD");
    }

    villagePlaceClick() {
        socketHandeler.attemptPlace("VILLAGE");
    }

    cityPlaceClick() {
        socketHandeler.attemptPlace("CITY");
    }

    cardPurchaseClick() {
        socketHandeler.attemptPlace("CARD");
    }

    card1PlayClick() {
        socketHandeler.playPillager();
    }

    endTurnClick() {
        socketHandeler.endTurn();
    }
}