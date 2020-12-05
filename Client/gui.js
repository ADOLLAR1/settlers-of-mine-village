class GUI {
    constructor(_playerdata) {
        this.playerdata = _playerdata; //PlayerData
        this.cowUp = createElement("button", "↑");
        this.woodUp = createElement("button", "↑");
        this.oreUp = createElement("button", "↑");
        this.fishUp = createElement("button", "↑");
        this.clayUp = createElement("button", "↑");
        this.glassUp = createElement("button", "↑");
        this.cowDown = createElement("button", "↓");
        this.woodDown = createElement("button", "↓");
        this.oreDown = createElement("button", "↓");
        this.fishDown = createElement("button", "↓");
        this.clayDown = createElement("button", "↓");
        this.glassDown = createElement("button", "↓");

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
    }
}