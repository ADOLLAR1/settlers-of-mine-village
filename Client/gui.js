class GUI {
    constructor(_playerdata) {
        this.playerdata = _playerdata; //PlayerData
        this.vpLabel = createElement("span", this.playerdata.victorypoints);
        this.cowLabel = createElement("span", this.playerdata.cow);
        this.woodLabel = createElement("span", this.playerdata.wood);
        this.oreLabel = createElement("span", this.playerdata.ore);
        this.fishLabel = createElement("span", this.playerdata.fish);
        this.clayLabel = createElement("span", this.playerdata.clay);
        this.glassLabel = createElement("span", this.playerdata.glass);
        this.roadLabel = createElement("span", this.playerdata.purchasedRoad);
        this.villageLabel = createElement("span", this.playerdata.purchasedVillage);
        this.cityLabel = createElement("span", this.playerdata.purchasedCity);
        this.roadPurchaseButton = createElement("button", "Purchase");
        this.villagePurchaseButton = createElement("button", "Purchase");
        this.cityPurchaseButton = createElement("button", "Purchase");
        this.roadPlaceButton = createElement("button", "Place");
        this.villagePlaceButton = createElement("button", "Place");
        this.cityPlaceButton = createElement("button", "Place");
        this.cardPurchaseButton = createElement("button", "Purchase");

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

        this.roadPurchaseButton.mouseClicked(() => {this.roadPurchaseClick()});
        this.villagePurchaseButton.mouseClicked(() => {this.villagePurchaseClick()});
        this.cityPurchaseButton.mouseClicked(() => {this.cityPurchaseClick()});
        this.roadPlaceButton.mouseClicked(() => {this.roadPlaceClick()});
        this.villagePlaceButton.mouseClicked(() => {this.villagePlaceClick()});
        this.cityPlaceButton.mouseClicked(() => {this.cityPlaceClick()});
        this.cardPurchaseButton.mouseClicked(() => {this.cardPurchaseClick()});
    }

    update() {
        this.vpLabel.html(this.playerdata.victorypoints);
        this.cowLabel.html(this.playerdata.cow);
        this.woodLabel.html(this.playerdata.wood);
        this.oreLabel.html(this.playerdata.ore);
        this.fishLabel.html(this.playerdata.fish);
        this.clayLabel.html(this.playerdata.clay);
        this.glassLabel.html(this.playerdata.glass);
        this.roadLabel.html(this.playerdata.purchasedRoad);
        this.villageLabel.html(this.playerdata.purchasedVillage);
        this.cityLabel.html(this.playerdata.purchasedCity);
    }

    roadPurchaseClick() {

    }

    villagePurchaseClick() {

    }

    cityPurchaseClick() {

    }

    roadPlaceClick() {

    }

    villagePlaceClick() {

    }

    cityPlaceClick() {

    }

    cardPurchaseClick() {

    }
}