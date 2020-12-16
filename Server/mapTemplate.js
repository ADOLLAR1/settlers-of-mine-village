const { strict } = require("assert");

class MapTemplate {
    constructor() {
        this.types = [
            {type:"Plain",res:"cow"},
            {type:"Forest",res:"wood"},
            {type:"Mountain",res:"ore"},
            {type:"Swamp",res:"clay"},
            {type:"Desert",res:"glass"}
        ];
        this.amount = 4; //int
        this.template0 = {"0-0":"O","1-0":"R","2-0":"O","3-0":"R","4-0":"O","5-0":"R","6-0":"O","7-0":"R","8-0":"O","9-0":"R","10-0":"O","11-0":"R","12-0":"O","13-0":"R","14-0":"O","0-1":"R","1-1":"U","2-1":"U","3-1":"U","4-1":"U","5-1":"U","6-1":"U","7-1":"U","8-1":"U","9-1":"U","10-1":"U","11-1":"U","12-1":"U","13-1":"U","14-1":"R","0-2":"O","1-2":"U","2-2":"L","3-2":"U","4-2":"L","5-2":"U","6-2":"L","7-2":"U","8-2":"L","9-2":"U","10-2":"L","11-2":"U","12-2":"L","13-2":"U","14-2":"O","0-3":"R","1-3":"U","2-3":"U","3-3":"U","4-3":"U","5-3":"U","6-3":"U","7-3":"U","8-3":"U","9-3":"U","10-3":"U","11-3":"U","12-3":"U","13-3":"U","14-3":"R","0-4":"O","1-4":"U","2-4":"L","3-4":"U","4-4":"L","5-4":"U","6-4":"L","7-4":"U","8-4":"L","9-4":"U","10-4":"L","11-4":"U","12-4":"L","13-4":"U","14-4":"O","0-5":"R","1-5":"U","2-5":"U","3-5":"U","4-5":"U","5-5":"U","6-5":"U","7-5":"U","8-5":"U","9-5":"U","10-5":"U","11-5":"U","12-5":"U","13-5":"U","14-5":"R","0-6":"O","1-6":"U","2-6":"L","3-6":"U","4-6":"L","5-6":"U","6-6":"L","7-6":"U","8-6":"L","9-6":"U","10-6":"L","11-6":"U","12-6":"L","13-6":"U","14-6":"O","0-7":"R","1-7":"U","2-7":"U","3-7":"U","4-7":"U","5-7":"U","6-7":"U","7-7":"U","8-7":"U","9-7":"U","10-7":"U","11-7":"U","12-7":"U","13-7":"U","14-7":"R","0-8":"O","1-8":"U","2-8":"L","3-8":"U","4-8":"L","5-8":"U","6-8":"L","7-8":"U","8-8":"L","9-8":"U","10-8":"L","11-8":"U","12-8":"L","13-8":"U","14-8":"O","0-9":"R","1-9":"U","2-9":"U","3-9":"U","4-9":"U","5-9":"U","6-9":"U","7-9":"U","8-9":"U","9-9":"U","10-9":"U","11-9":"U","12-9":"U","13-9":"U","14-9":"R","0-10":"O","1-10":"U","2-10":"L","3-10":"U","4-10":"L","5-10":"U","6-10":"L","7-10":"U","8-10":"L","9-10":"U","10-10":"L","11-10":"U","12-10":"L","13-10":"U","14-10":"O","0-11":"R","1-11":"U","2-11":"U","3-11":"U","4-11":"U","5-11":"U","6-11":"U","7-11":"U","8-11":"U","9-11":"U","10-11":"U","11-11":"U","12-11":"U","13-11":"U","14-11":"R","0-12":"O","1-12":"U","2-12":"L","3-12":"U","4-12":"L","5-12":"U","6-12":"L","7-12":"U","8-12":"L","9-12":"U","10-12":"L","11-12":"U","12-12":"L","13-12":"U","14-12":"O","0-13":"R","1-13":"U","2-13":"U","3-13":"U","4-13":"U","5-13":"U","6-13":"U","7-13":"U","8-13":"U","9-13":"U","10-13":"U","11-13":"U","12-13":"U","13-13":"U","14-13":"R","0-14":"O","1-14":"R","2-14":"O","3-14":"R","4-14":"O","5-14":"R","6-14":"O","7-14":"R","8-14":"O","9-14":"R","10-14":"O","11-14":"R","12-14":"O","13-14":"R","14-14":"O"}; //ISLAND
        this.template1 = {"0-0":"O","1-0":"R","2-0":"O","3-0":"R","4-0":"O","5-0":"R","6-0":"O","7-0":"R","8-0":"O","9-0":"R","10-0":"O","11-0":"R","12-0":"O","13-0":"R","14-0":"O","0-1":"R","1-1":"R","2-1":"R","3-1":"U","4-1":"U","5-1":"U","6-1":"U","7-1":"U","8-1":"U","9-1":"U","10-1":"U","11-1":"U","12-1":"R","13-1":"R","14-1":"R","0-2":"O","1-2":"R","2-2":"O","3-2":"U","4-2":"L","5-2":"U","6-2":"L","7-2":"U","8-2":"L","9-2":"U","10-2":"L","11-2":"U","12-2":"O","13-2":"R","14-2":"O","0-3":"R","1-3":"U","2-3":"U","3-3":"U","4-3":"U","5-3":"U","6-3":"U","7-3":"U","8-3":"U","9-3":"U","10-3":"U","11-3":"U","12-3":"U","13-3":"U","14-3":"R","0-4":"O","1-4":"U","2-4":"L","3-4":"U","4-4":"L","5-4":"U","6-4":"L","7-4":"U","8-4":"L","9-4":"U","10-4":"L","11-4":"U","12-4":"L","13-4":"U","14-4":"O","0-5":"R","1-5":"U","2-5":"U","3-5":"U","4-5":"U","5-5":"U","6-5":"U","7-5":"U","8-5":"U","9-5":"U","10-5":"U","11-5":"U","12-5":"U","13-5":"U","14-5":"R","0-6":"O","1-6":"U","2-6":"L","3-6":"U","4-6":"L","5-6":"U","6-6":"L","7-6":"U","8-6":"L","9-6":"U","10-6":"L","11-6":"U","12-6":"L","13-6":"U","14-6":"O","0-7":"R","1-7":"U","2-7":"U","3-7":"U","4-7":"U","5-7":"U","6-7":"U","7-7":"U","8-7":"U","9-7":"U","10-7":"U","11-7":"U","12-7":"U","13-7":"U","14-7":"R","0-8":"O","1-8":"U","2-8":"L","3-8":"U","4-8":"L","5-8":"U","6-8":"L","7-8":"U","8-8":"L","9-8":"U","10-8":"L","11-8":"U","12-8":"L","13-8":"U","14-8":"O","0-9":"R","1-9":"U","2-9":"U","3-9":"U","4-9":"U","5-9":"U","6-9":"U","7-9":"U","8-9":"U","9-9":"U","10-9":"U","11-9":"U","12-9":"U","13-9":"U","14-9":"R","0-10":"O","1-10":"U","2-10":"L","3-10":"U","4-10":"L","5-10":"U","6-10":"L","7-10":"U","8-10":"L","9-10":"U","10-10":"L","11-10":"U","12-10":"L","13-10":"U","14-10":"O","0-11":"R","1-11":"U","2-11":"U","3-11":"U","4-11":"U","5-11":"U","6-11":"U","7-11":"U","8-11":"U","9-11":"U","10-11":"U","11-11":"U","12-11":"U","13-11":"U","14-11":"R","0-12":"O","1-12":"R","2-12":"O","3-12":"U","4-12":"L","5-12":"U","6-12":"L","7-12":"U","8-12":"L","9-12":"U","10-12":"L","11-12":"U","12-12":"O","13-12":"R","14-12":"O","0-13":"R","1-13":"R","2-13":"R","3-13":"U","4-13":"U","5-13":"U","6-13":"U","7-13":"U","8-13":"U","9-13":"U","10-13":"U","11-13":"U","12-13":"R","13-13":"R","14-13":"R","0-14":"O","1-14":"R","2-14":"O","3-14":"R","4-14":"O","5-14":"R","6-14":"O","7-14":"R","8-14":"O","9-14":"R","10-14":"O","11-14":"R","12-14":"O","13-14":"R","14-14":"O"}; //ROUND ISLAND
        this.template2 = {"0-0":"O","1-0":"R","2-0":"O","3-0":"R","4-0":"O","5-0":"R","6-0":"O","7-0":"R","8-0":"O","9-0":"R","10-0":"O","11-0":"R","12-0":"O","13-0":"R","14-0":"O","0-1":"R","1-1":"U","2-1":"U","3-1":"U","4-1":"U","5-1":"U","6-1":"U","7-1":"U","8-1":"U","9-1":"U","10-1":"U","11-1":"U","12-1":"U","13-1":"U","14-1":"R","0-2":"O","1-2":"U","2-2":"L","3-2":"U","4-2":"L","5-2":"U","6-2":"L","7-2":"U","8-2":"L","9-2":"U","10-2":"L","11-2":"U","12-2":"L","13-2":"U","14-2":"O","0-3":"R","1-3":"U","2-3":"U","3-3":"U","4-3":"U","5-3":"U","6-3":"U","7-3":"U","8-3":"U","9-3":"U","10-3":"U","11-3":"U","12-3":"U","13-3":"U","14-3":"R","0-4":"O","1-4":"U","2-4":"L","3-4":"U","4-4":"L","5-4":"U","6-4":"L","7-4":"U","8-4":"L","9-4":"U","10-4":"L","11-4":"U","12-4":"L","13-4":"U","14-4":"O","0-5":"R","1-5":"U","2-5":"U","3-5":"U","4-5":"U","5-5":"U","6-5":"U","7-5":"U","8-5":"U","9-5":"U","10-5":"U","11-5":"U","12-5":"U","13-5":"U","14-5":"R","0-6":"O","1-6":"U","2-6":"L","3-6":"U","4-6":"L","5-6":"U","6-6":"L","7-6":"U","8-6":"L","9-6":"U","10-6":"L","11-6":"U","12-6":"L","13-6":"U","14-6":"O","0-7":"R","1-7":"R","2-7":"R","3-7":"R","4-7":"R","5-7":"R","6-7":"R","7-7":"R","8-7":"R","9-7":"R","10-7":"R","11-7":"R","12-7":"R","13-7":"R","14-7":"R","0-8":"O","1-8":"U","2-8":"L","3-8":"U","4-8":"L","5-8":"U","6-8":"L","7-8":"U","8-8":"L","9-8":"U","10-8":"L","11-8":"U","12-8":"L","13-8":"U","14-8":"O","0-9":"R","1-9":"U","2-9":"U","3-9":"U","4-9":"U","5-9":"U","6-9":"U","7-9":"U","8-9":"U","9-9":"U","10-9":"U","11-9":"U","12-9":"U","13-9":"U","14-9":"R","0-10":"O","1-10":"U","2-10":"L","3-10":"U","4-10":"L","5-10":"U","6-10":"L","7-10":"U","8-10":"L","9-10":"U","10-10":"L","11-10":"U","12-10":"L","13-10":"U","14-10":"O","0-11":"R","1-11":"U","2-11":"U","3-11":"U","4-11":"U","5-11":"U","6-11":"U","7-11":"U","8-11":"U","9-11":"U","10-11":"U","11-11":"U","12-11":"U","13-11":"U","14-11":"R","0-12":"O","1-12":"U","2-12":"L","3-12":"U","4-12":"L","5-12":"U","6-12":"L","7-12":"U","8-12":"L","9-12":"U","10-12":"L","11-12":"U","12-12":"L","13-12":"U","14-12":"O","0-13":"R","1-13":"U","2-13":"U","3-13":"U","4-13":"U","5-13":"U","6-13":"U","7-13":"U","8-13":"U","9-13":"U","10-13":"U","11-13":"U","12-13":"U","13-13":"U","14-13":"R","0-14":"O","1-14":"R","2-14":"O","3-14":"R","4-14":"O","5-14":"R","6-14":"O","7-14":"R","8-14":"O","9-14":"R","10-14":"O","11-14":"R","12-14":"O","13-14":"R","14-14":"O"}; //THE GREAT DIVIDE
        this.template3 = {"0-0":"O","1-0":"R","2-0":"O","3-0":"R","4-0":"O","5-0":"R","6-0":"O","7-0":"R","8-0":"O","9-0":"R","10-0":"O","11-0":"R","12-0":"O","13-0":"R","14-0":"O","0-1":"R","1-1":"U","2-1":"U","3-1":"U","4-1":"U","5-1":"U","6-1":"U","7-1":"U","8-1":"U","9-1":"U","10-1":"U","11-1":"U","12-1":"U","13-1":"U","14-1":"R","0-2":"O","1-2":"U","2-2":"L","3-2":"U","4-2":"L","5-2":"U","6-2":"L","7-2":"U","8-2":"L","9-2":"U","10-2":"L","11-2":"U","12-2":"L","13-2":"U","14-2":"O","0-3":"R","1-3":"U","2-3":"U","3-3":"U","4-3":"R","5-3":"R","6-3":"U","7-3":"U","8-3":"U","9-3":"U","10-3":"U","11-3":"U","12-3":"U","13-3":"U","14-3":"R","0-4":"O","1-4":"U","2-4":"L","3-4":"R","4-4":"G","5-4":"R","6-4":"L","7-4":"U","8-4":"L","9-4":"U","10-4":"L","11-4":"U","12-4":"L","13-4":"U","14-4":"O","0-5":"R","1-5":"U","2-5":"U","3-5":"R","4-5":"R","5-5":"U","6-5":"U","7-5":"U","8-5":"U","9-5":"U","10-5":"U","11-5":"U","12-5":"U","13-5":"U","14-5":"R","0-6":"O","1-6":"U","2-6":"L","3-6":"U","4-6":"L","5-6":"U","6-6":"L","7-6":"U","8-6":"L","9-6":"U","10-6":"L","11-6":"U","12-6":"L","13-6":"U","14-6":"O","0-7":"R","1-7":"U","2-7":"U","3-7":"U","4-7":"U","5-7":"U","6-7":"U","7-7":"U","8-7":"U","9-7":"U","10-7":"U","11-7":"U","12-7":"U","13-7":"U","14-7":"R","0-8":"O","1-8":"U","2-8":"L","3-8":"U","4-8":"L","5-8":"U","6-8":"L","7-8":"U","8-8":"L","9-8":"U","10-8":"L","11-8":"U","12-8":"L","13-8":"U","14-8":"O","0-9":"R","1-9":"U","2-9":"U","3-9":"U","4-9":"U","5-9":"U","6-9":"U","7-9":"U","8-9":"U","9-9":"U","10-9":"U","11-9":"U","12-9":"U","13-9":"U","14-9":"R","0-10":"O","1-10":"U","2-10":"L","3-10":"U","4-10":"L","5-10":"U","6-10":"L","7-10":"U","8-10":"L","9-10":"U","10-10":"L","11-10":"U","12-10":"L","13-10":"U","14-10":"O","0-11":"R","1-11":"U","2-11":"U","3-11":"U","4-11":"U","5-11":"U","6-11":"U","7-11":"U","8-11":"U","9-11":"U","10-11":"U","11-11":"U","12-11":"U","13-11":"U","14-11":"R","0-12":"O","1-12":"U","2-12":"L","3-12":"U","4-12":"L","5-12":"U","6-12":"L","7-12":"U","8-12":"L","9-12":"U","10-12":"L","11-12":"U","12-12":"L","13-12":"U","14-12":"O","0-13":"R","1-13":"U","2-13":"U","3-13":"U","4-13":"U","5-13":"U","6-13":"U","7-13":"U","8-13":"U","9-13":"U","10-13":"U","11-13":"U","12-13":"U","13-13":"U","14-13":"R","0-14":"O","1-14":"R","2-14":"O","3-14":"R","4-14":"O","5-14":"R","6-14":"O","7-14":"R","8-14":"O","9-14":"R","10-14":"O","11-14":"R","12-14":"O","13-14":"R","14-14":"O"}; //BADLANDS
    }

    pickRandom() {
        return this["template" + Math.floor(Math.random() * this.amount)];
    }

    posKey(_x, _y) {
        return (_x + "-" + _y);
    }
}

module.exports = new MapTemplate();