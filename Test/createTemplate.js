let template = {}

for (let i=0;i<15;i++) {
    for (let j=0;j<15;j++) {
        if (j == 0 || j == 14 || i == 0 || i == 14) {
            if (j % 2 == 0 && i% 2 == 0) {
                template[posKey(j,i)] = "O";
            } else {
                template[posKey(j,i)] = "R";
            }
        } else {
            if (j % 2 == 0 && i% 2 == 0) {
                template[posKey(j,i)] = "L";
            } else {
                template[posKey(j,i)] = "U"
            }
        }
    }
}

console.log(JSON.stringify(template));

function posKey(_x, _y) {
    return (_x + "-" + _y);
}