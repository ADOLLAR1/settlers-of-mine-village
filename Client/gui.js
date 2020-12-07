class GUI {
    constructor(_playerdata) {
        this.playerdata = _playerdata; //PlayerData
        this.cowUp = createElement("button", "<i class='fas fa-chevron-up'></i>");
        this.woodUp = createElement("button", "<i class='fas fa-chevron-up'></i>");
        this.oreUp = createElement("button", "<i class='fas fa-chevron-up'></i>");
        this.fishUp = createElement("button", "<i class='fas fa-chevron-up'></i>");
        this.clayUp = createElement("button", "<i class='fas fa-chevron-up'></i>");
        this.glassUp = createElement("button", "<i class='fas fa-chevron-up'></i>");
        this.cowDown = createElement("button", "<i class='fas fa-chevron-down'></i>");
        this.woodDown = createElement("button", "<i class='fas fa-chevron-down'></i>");
        this.oreDown = createElement("button", "<i class='fas fa-chevron-down'></i>");
        this.fishDown = createElement("button", "<i class='fas fa-chevron-down'></i>");
        this.clayDown = createElement("button", "<i class='fas fa-chevron-down'></i>");
        this.glassDown = createElement("button", "<i class='fas fa-chevron-down'></i>");
        this.cowLabel = createElement("p", "0");
        this.woodLabel = createElement("p", "0");
        this.oreLabel = createElement("p", "0");
        this.fishLabel = createElement("p", "0");
        this.clayLabel = createElement("p", "0");
        this.glassLabel = createElement("p", "0");
        this.roadLabel = createElement("p", "0");
        this.villageLabel = createElement("p", "0");
        this.cityLabel = createElement("p", "0");

        this.cowUp.parent("cowUp");
        this.woodUp.parent("woodUp");
        this.oreUp.parent("oreUp");
        this.fishUp.parent("fishUp");
        this.clayUp.parent("clayUp");
        this.glassUp.parent("glassUp");
        this.cowDown.parent("cowDown");
        this.woodDown.parent("woodDown");
        this.oreDown.parent("oreDown");
        this.fishDown.parent("fishDown");
        this.clayDown.parent("clayDown");
        this.glassDown.parent("glassDown");
        this.cowLabel.parent("cowLabel");
        this.woodLabel.parent("woodlabel");
        this.oreLabel.parent("oreLabel");
        this.fishLabel.parent("fishLabel");
        this.clayLabel.parent("clayLabel");
        this.glassLabel.parent("glassLabel");
        this.roadLabel.parent("roadLabel");
        this.villageLabel.parent("villageLabel");
        this.cityLabel.parent("cityLabel");
    }
}