class GUI {
    constructor(_playerdata) {
        this.playerdata = _playerdata; //PlayerData
        this.rolls = 0; //int
        this.keyLabel = createElement("span", this.playerdata.key.toString());
        this.vpLabel = createElement("span", this.playerdata.victoryPoints.toString());
        this.cowLabel = createElement("span", this.playerdata.cow.toString());
        this.woodLabel = createElement("span", this.playerdata.wood.toString());
        this.oreLabel = createElement("span", this.playerdata.ore.toString());
        this.fishLabel = createElement("span", this.playerdata.fish.toString());
        this.clayLabel = createElement("span", this.playerdata.clay.toString());
        this.glassLabel = createElement("span", this.playerdata.glass.toString());
        this.goldLabel = createElement("span", this.playerdata.gold.toString());
        this.goldUse = createElement("button", "Use Gold");
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
        this.startTradeButton = createElement("button", "Start Trade");
        this.bankTradeButton = createElement("button", "Bank Trade");
        this.endTurnButton = createElement("button", "End Turn");
        this.meter2 = createElement("meter", "");
        this.meter3 = createElement("meter", "");
        this.meter4 = createElement("meter", "");
        this.meter5 = createElement("meter", "");
        this.meter6 = createElement("meter", "");
        this.meter7 = createElement("meter", "");
        this.meter8 = createElement("meter", "");
        this.meter9 = createElement("meter", "");
        this.meter10 = createElement("meter", "");
        this.meter11 = createElement("meter", "");
        this.meter12 = createElement("meter", "");

        this.keyLabel.parent("keyLabel");
        this.vpLabel.parent("vpLabel");
        this.cowLabel.parent("cowLabel");
        this.woodLabel.parent("woodLabel");
        this.oreLabel.parent("oreLabel");
        this.fishLabel.parent("fishLabel");
        this.clayLabel.parent("clayLabel");
        this.glassLabel.parent("glassLabel");
        this.goldLabel.parent("goldLabel");
        this.goldUse.parent("goldUse");
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
        this.startTradeButton.parent("startTrade");
        this.bankTradeButton.parent("bankTrade");
        this.endTurnButton.parent("end");
        this.meter2.parent("2");
        this.meter3.parent("3");
        this.meter4.parent("4");
        this.meter5.parent("5");
        this.meter6.parent("6");
        this.meter7.parent("7");
        this.meter8.parent("8");
        this.meter9.parent("9");
        this.meter10.parent("10");
        this.meter11.parent("11");
        this.meter12.parent("12");

        this.goldUse.mouseClicked(() => {this.goldUseClick()});
        this.roadPurchaseButton.mouseClicked(() => {this.roadPurchaseClick()});
        this.villagePurchaseButton.mouseClicked(() => {this.villagePurchaseClick()});
        this.cityPurchaseButton.mouseClicked(() => {this.cityPurchaseClick()});
        this.roadPlaceButton.mouseClicked(() => {this.roadPlaceClick()});
        this.villagePlaceButton.mouseClicked(() => {this.villagePlaceClick()});
        this.cityPlaceButton.mouseClicked(() => {this.cityPlaceClick()});
        this.cardPurchaseButton.mouseClicked(() => {this.cardPurchaseClick()});
        this.card1PlayButton.mouseClicked(() => {this.card1PlayClick()});
        this.startTradeButton.mouseClicked(() => {this.startTradeClick()});
        this.bankTradeButton.mouseClicked(() => {this.bankTradeClick()});
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
        this.goldLabel.html(this.playerdata.gold.toString());
        this.roadLabel.html(this.playerdata.purchasedRoad.toString());
        this.villageLabel.html(this.playerdata.purchasedVillage.toString());
        this.cityLabel.html(this.playerdata.purchasedCity.toString());
    }

    goldUseClick() {
        if (this.playerdata.gold >= 1) {
            socketHandeler.useGold();
        }
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
        socketHandeler.purchase("CARD");
    }

    card1PlayClick() {
        socketHandeler.playPillager();
    }

    startTradeClick() {
        socketHandeler.startTrade();
    }

    bankTradeClick() {
        socketHandeler.bankTrade();
    }

    endTurnClick() {
        socketHandeler.endTurn();
    }

    updateNumbers(_num) {
        this["meter" + _num].elt.value++;
        for (let i=2; i<=12; i++) {
            this["meter" + i].elt.max = 1000;
            if (parseInt(this["meter" + i].elt.value) > this.rolls) {
                this.rolls = parseInt(this["meter" + i].elt.value);
            }
        }
        for (let i=2; i<=12; i++) {
            this["meter" + i].elt.max = this.rolls;
        }
    }
}